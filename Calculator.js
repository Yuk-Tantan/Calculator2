'use strict'; {

  //計算過程と答えの表記場所を指定
  let dispPrc = document.getElementById('dispPrc');
  const dispRslt = document.getElementById('dispRslt');

  //prc(計算過程)、mode(整数or小数)、state(式の状態)の初期値を設定。
  let prc = 0;
  let mode = 'integer_mode';
  let state = 'start';
  console.log(state);　
  // note: 変数stateに、start, calculation, calBtn, finishを代入して状態を管理します。  
  // 1)start ・・・・・・・ACを押した時に元に戻るようにする。
  // 2)calculation　・・・計算をしている間に数字を入力できるようにする。
  // 3)calBtn　・・・・・・四則演算をする際に別の四則を加えられないようにする。
  // 4)finish　・・・・・・「＝」を押して計算を終わらせ、初期値0からもう一度計算できるようにする。
  
  // 1-9の数字ボタンを押した時の処理
  const smplNum = document.querySelectorAll('.smplNum');
  smplNum.forEach(index => {     
    index.addEventListener('click', () => {
      if(state === 'start') {
        prc = index.dataset.indexId;
        console.log(state);
      }else if(state === 'finish') {
        reset();
        prc = index.dataset.indexId; 
        console.log(state);
      }else if(state === 'calculation'||state === 'calBtn'){
        prc += index.dataset.indexId;
        console.log(state);
      }
      //表示部位に打たれた数字を表記・・・①
      dispPrc.textContent = prc;
      //計算過程と答えの表示切替・・・②
      chngDisp()
      state = 'calculation'
      //↓↓↓動作確認用↓↓↓//
      console.log(chngDisp);
      console.log(state);
    })
  })

  //0ボタンに対する計算処理
  const snglZero = document.getElementById('snglZero');
  snglZero.addEventListener('click', () => {
  // 計算過程の「state===calculation」以外の時、前の文字が0の時は0が入力できないようにする。
    if(state==='start'||state==='finish'||state==='calBtn'){
      if(dispPrc.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }
    if(state==='start') {
      prc = snglZero.dataset.indexId;  
    }else{
      prc += snglZero.dataset.indexId;
    }
    dispPrc.textContent = prc;//・・・①
    chngDisp()//・・・②
    console.log(chngDisp);
    console.log(state);
  })

  //00ボタンに対する計算処理（上と同様に処理を行う）
  const doblZero = document.getElementById('doblZero');
  doblZero.addEventListener('click', () => {
    if(state==='start'||state==='finish'||state==='calBtn'){
      if(dispPrc.textContent.slice(-1) === '0') {
        console.log('前の文字はゼロ');
        return;
      }
    }
    if(state==='start') {
      prc = doblZero.dataset.indexId;  
    }else{
      prc += doblZero.dataset.indexId;
    }      
    dispPrc.textContent = prc;//・・・①
    chngDisp()//・・・②
    console.log(chngDisp);
    console.log(state);
  })

  //小数点ボタンに対する処理
  const pnt = document.getElementById('pnt');
  pnt.addEventListener('click', () => {
    console.log(pnt.dataset.indexId)
    if(mode === 'decimal_mode'){
      return;//一度ボタンを押すと二度以上押しても反応しない
    }
    //「初期の状態」または「答えた後の状態」から小数点を押す際に、
    //「小数点だけの表記の回避」と「小数点の答えの後に小数点が来るのを回避」するために初期値へ戻す。
    if(state==='start'||state==='finish') {
      console.log(state);
      prc = 0;
    //もしも四則記号を押した後であれば、小数点を押した際に「0.~」となるようにする。
    }else if(state==='calBtn'){
      console.log(state);
      if(dispPrc.textContent.slice(-1)!=='0'){
        prc += 0;
      }   
    }
    prc += pnt.dataset.indexId;
    dispPrc.textContent = prc;//・・・①
    chngDisp()//・・・②
    state = 'calculation'
    mode = 'decimal_mode';
    console.log(chngDisp);
  })

  //「＋　÷　－　×」ボタンを押した時
  const cal = document.querySelectorAll('.action');
  cal.forEach(index => {     
    index.addEventListener('click', () => {
      if(state === 'start') {
        console.log(state);
        return;
      }else if(state === 'calculation'){
        console.log(state);
        prc += index.dataset.indexId;
      }else if(state === 'finish'){
        console.log(state);
        prc = dispRslt.textContent;
        prc += index.dataset.indexId;
        dispRslt.textContent = 0
      }else if(state ==='calBtn') {
        console.log(state);
        prc = prc.slice(0, -1)
        prc += index.dataset.indexId;
      }
      dispPrc.textContent = prc;//・・・①
      state = 'calBtn'
      console.log(state);
      mode ='integer_mode'
      chngDisp()//・・・②
      console.log(chngDisp);
    })
  })

  //イコールを押した時
  const eqlBtn = document.getElementById('eqlBtn');
  eqlBtn.addEventListener('click',() =>{
    console.log(eval(prc));
    dispRslt.textContent = digitNum(eval(prc));
    state = 'finish'
    console.log(state);
    mode ='integer_mode'
    chngDisp()//・・・②
    console.log(chngDisp);
  });

  //Cボタン（リセットボタン）を押した時の処理
  const clear = document.getElementById('clear')
  clear.addEventListener('click', () => {
    reset();
  })

 //リセットを行う関数
  function reset() {
    prc = 0; 
    dispPrc.textContent = 0;
    dispRslt.textContent = 0;
    mode ='integer_mode'
    state ='start';
    console.log(state);
    chngDisp()//・・・②
    console.log(chngDisp);
  }

  //桁数を揃える関数10桁を表示させる関数
  function digitNum(num) {
    return Math.round(num*100000000)/100000000;
  }

  //計算過程結果、計算結果画面の表示の切り替え
  function chngDisp(){
    if(state==='finish'){
      dispRslt.classList.add('active');
      dispPrc.classList.remove('active');   
    } else {
      dispPrc.classList.add('active');
      dispRslt.classList.remove('active'); 
    } 
  }
}

