interface ITimerValues {
  [key: string]: number;
}

/**
 * Objecto con los valores de los temporizadores
 * Minutos * segundos
 *
 * @type {ITimerValues}
 */
const timerValues: ITimerValues = {
  Pomodoro: 25 * 60,
  "Short Break": 5 * 60,
  "Long Break": 15 * 60,
};

export default timerValues;
