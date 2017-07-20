import expect from 'expect';
// Step2
import { createStore } from 'redux';
// Step3
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Step1
 * Reducer
 * まずはReducerの動作から確認していきます。
 * srcディレクトリにapp.jsを作成、そこにReducerの機能を書いていきます。今後、単純化のためにapp.jsにすべての機能を書いていきます。
 * ReducerはStateとActionを受け取って、Stateを返す関数なので、とりあえずそのまま書きます。
 *（ここでStateはカウンタの数字そのものを指します)
 */

 /**
  * Step2
  * Storeの作成
  * 次にReducerと密接に関係しているStoreを作成します。
  * Storeの定義は、Stateを保管する場所というものでした。
  * ここで、いよいよReduxをインポートします。ここではStoreを作成する関数であるcreateStoreのみインポートします。
  * Store作成には、先ほどインポートしたcreateStoreを使用します。この関数はreducerを引数にとります。
  */

/**
  * Step3
  * viewにReactを使用する
  *
  * --View部分をReactに置き換える--
  * 1.Reactを使用しますので、それぞれreact、react-domをインポートします。
  * 2.また、dist/index.htmlに、Reactの起点となるポイント(id="root"のdiv要素)を追加します。
  */

/**
  * Step4
  * ボタンの追加
  *
  * --どうせならカウントアップ、カウントダウンのボタンを追加--
  */

 /**
  * Step1 reducer
  * conuter
  * @params {Integer} state値
  * @params {object}  actionのタイプ (追加: INCREMENT, 減少: DECREMENT)
  */
//const counter = (state, action) => {
const counter = (state = 0, action) => {  // 5.初期設定のテストをクリアする
    // 受け取ったactionに応じてstateを変化させる
    switch (action.type) {
        case 'INCREMENT':   // テスト 1 or 2
            return state + 1;

        case 'DECREMENT':   // テスト 3
            return state - 1;

        default:    // テスト 4
            return state
    }

}


/**
 * Step3 viewをreactに変更
 * 3-1 まず、JSXでCounterコンポーネントを作成します。
 *     propsとしてカウンターの値を受け取ります。
 *
 * @param {Integer} value :: propsとしてカウンターの値
 */
// const Counter = ({value}) => (
    // <h1>{value}</h1>
// )

/**
 * Step4 ボタンの追加
 *
 * -カウントアップ、カウントダウンのボタンを追加-
 * @param {Integer} value :: propsとしてカウンターの値
 * @param onIncrement clickイベント
 * @param onDecrement clickイベント
 *
 * propsとして、valueだけでなく、ボタンをクリックした際のイベントも受け取るようにします。
 */
 const Counter = ({
     value,
     onIncrement,
     onDecrement
 }) => (
     <div>
         <h1>{value}</h1>
         <h2>ああああああああああああ</h2>
         <button
              onClick={onIncrement}>+
         </button>
         <button
              onClick={onDecrement}>-
         </button>
     </div>
 )


/**
 * step2 store
 * 作成したreducerであるcounter関数を引数に指定してstoreを作成
 *
 * storeは重要な関数を3つもっています。
 * 2-1 getState
 * まずはgetStateです。これは、文字通り現在のstateを返します。
 *
 * 2-2 dispatch
 * これはActionを引数にとり、Reducerに現在のStateとActionを渡します。
 * 結果、ReducerがActionに応じてStateを変化させます。
 *
 * 2-3 subscribe
 * これは関数を引数にとり、dispatchが実行される都度、引数に渡された関数を実行します。
 * つまり、ここにStateを取得して画面を更新する関数を引数に設定すれば、dispatchが実行される都度、画面が更新されることになります。
 * 例として、画面のどこでもクリックすれば延々とカウントアップさせるようにしてみます。
 *
 * 2-3-1 真っ白もどうかと思うので、少しコードをいじります。
 * 最初の画面を０と表示
 */
const store = createStore(counter);

// 2-3 subscribe
// subscribe関数に、現在のstateの状況を画面に表示する関数をセット
// store.subscribe( () => {
//
// 2-3-1 白もどうかと思うので、少しコードをいじります。
// const render = () => {
    // document.body.innerText = store.getState();
// }
//});
//
// 3-2 それをReactDOMでrenderします。
const render = () => {
    ReactDOM.render(
        // <Counter value={store.getState()} />,
        // Step4 ボタンの追加
        // イベントと結びつける部分は、直接dispatchする関数を返すようにしています。
        // 2-2で行っていたことを担当
        <Counter
            value={store.getState()}
            onIncrement={() => store.dispatch({
                type: 'INCREMENT'
            })}
            onDecrement={() => store.dispatch({
                type: 'DECREMENT'
            })}
        />,
        document.getElementById('root')
    )
}

// 2-3-1 白もどうかと思うので、少しコードをいじります。
// subscribe関数に、現在のstateの状況(store.getState())を画面に表示する関数(render)をセット
store.subscribe(render);

// 2-3-1 白もどうかと思うので、少しコードをいじります。
// 最初に画面を表示（0が表示される)
// これできちんと画面には初期値から表示されるようになりました。
// ・・・ここで気づかれたと思いますが、viewに関するコードが入り込んできました。 -> reactにしていく
render();


// 2-1 getState
// getStateで、現在のstateを返す
// 上記のコードを追加して実行すると、コンソールに0と表示されます。これは、先ほど実装したようにstateが0で初期化されたことを表しています。
console.log(store.getState());

// 2-2 dispatch
// dispatch( <アクション> )で、reducerにStateとActionを送る・・・
// Stateがアクションの内容により変化
// store.dispatch({type: 'INCREMENT'});
//
// documentオブジェクトをクリックしたらINCREMENTアクションをdispatchする
// イベントを追加
/* Step4 で別途しょり
document.addEventListener('click', () => {
    store.dispatch({ type: 'INCREMENT' });

    // Stateが変化したか確認
    // コンソールで実行すると0と1が表示されます。dispatchによってStateが変化しています。
    console.log(store.getState());
});
*/


/**
 * test code at reducer
 * @params {Integer} state値
 * @params {object}  actionのタイプ (追加: INCREMENT, 減少: DECREMENT, 未定義: UNKNOWN)
 * toEqual :結果　(returnされる stateの値)
 */
 /* 2 state時 コメントアウト
// 1.加算
expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1)

// 2.加算
expect(
    counter(1, {type: 'INCREMENT'})
).toEqual(2)

// 3.減少
expect(
    counter(2, {type: 'DECREMENT'})
).toEqual(1)

// 4.未知のコマンドには、undefinedではなく、現状のstateがそのまま使われる
expect(
    counter(1, {type: 'UNKNOWN'})
).toEqual(1)

// stateにundefined、かつActionには何も渡さない、つまり初期設定の場合は0にリセットしてほしい
// 5.初期設定
expect(
    counter(undefined, {})
).toEqual(0)

console.log('text passed');


//これでreducerの完成です。全くReduxの文字は出てきませんでしたが、Reducerはそもそも単純な関数に過ぎないので、このような形で作れます。
*/
