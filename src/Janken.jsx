// pages/Janken.jsx
import { useState } from "react";
import { ActionButton } from "../components/ActionButton";

//
export const Janken = () => {
  //state①
  //自分の手の状態を保存するstate
  const [jankenResult, setJankenResult] = useState({
    myHand: "入力待ち",
    comHand: "待機中",
    result: "未対戦",
  });
  //state②
  //履歴を保存するための state を作成．初期値は空配列
  const [history, setHistory] = useState([]);

  //関数①
  //「自分の手」を入力して，「自分の手，相手の手，勝敗」を持ったオブジェクトを出力する関数
  const getJankenResult = (myHand) => {
    const hand = ["グー", "チョキ", "パー"];
    const myIndex = hand.indexOf(myHand);

    //0,1,2の範囲でランダムな数字を返す
    const comIndex = Math.floor(Math.random() * 3);
    const resultSheet = [
      ["Draw", "Win", "Lose"],
      ["Lose", "Draw", "Win"],
      ["Win", "Lose", "Draw"],
    ];

    //もし買ったっ場合は
    if(resultSheet[myIndex][comIndex] == "Win"){
      console.log("勝ったでい！！");
    };
    
    //myHand,comHand,resultを返す
    return {
      myHand: myHand,
      comHand: hand[comIndex],
      result: resultSheet[myIndex][comIndex],
    };
  };



  //関数②
  const getJanken = (myHand) => {
    //上で作成したgetJankenResultを呼び出し変数resultに格納する
    const result = getJankenResult(myHand);
    setJankenResult(result);
    // 🔽 「履歴の配列の先頭にじゃんけんの結果を追加した新しい配列」を作成して履歴のデータを上書きする．
    setHistory([result, ...history]);
  };


  //return部分
  return (
    <>
      <p>じゃんけんの画面</p>
      <ActionButton text="グー" action={() => getJanken("グー")} />
      <ActionButton text="チョキ" action={() => getJanken("チョキ")} />
      <ActionButton text="パー" action={() => getJanken("パー")} />
      <p>自分の手：{jankenResult.myHand}</p>
      <p>相手の手：{jankenResult.comHand}</p>
      <p>結果：{jankenResult.result}</p>
      {/* 🔽 追加 */}
      <p>履歴</p>
      <table>
        <thead>
          <tr>
            <th>自分の手</th>
            <th>相手の手</th>
            <th>結果</th>
          </tr>
        </thead>
        <tbody>
          {/* 🔽 履歴の配列から要素を生成して表示する */}
          {history.map((x, i) => (
            <tr key={i}>
              <td>{x.myHand}</td>
              <td>{x.comHand}</td>
              <td>{x.result}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
