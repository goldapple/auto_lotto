type LottoNumber = {
  number: number[];
  bonus: number | null;
};
//
type ActionType = {
  type: string;
  payload: LottoNumber;
};
type initType = {
  win: LottoNumber;
  my: LottoNumber;
};
//액션 타입
const SAVE_WIN_NUMBER: string = 'reducer/SAVE_WIN_NUMBER';
const SAVE_MY_NUMBER: string = 'reducer/SAVE_MY_NUMBER';
//액션생성함수
export const save_win_number = (payload: LottoNumber): ActionType => {
  return { type: SAVE_WIN_NUMBER, payload };
};
export const save_my_number = (payload: LottoNumber): ActionType => {
  return { type: SAVE_MY_NUMBER, payload };
};
//초기값
const initState: initType = {
  win: { number: [], bonus: -1 },
  my: {
    number: [],
    bonus: -1,
  },
};

const reducer = (state = initState, action: ActionType): initType => {
  switch (action.type) {
    case SAVE_WIN_NUMBER:
      return { ...state, win: action.payload };
    case SAVE_MY_NUMBER:
      return { ...state, my: action.payload };
    default:
      return state;
  }
};
export default reducer;
