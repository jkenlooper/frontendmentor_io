// Ideally the countdown would be towards an actual date time and not
// a duration, but for the purposes of this example it uses a duration and
// pauses initially for a screenshot to occur at the start.
function countdown(duration) {
  // Add initial delay so the screenshot will get the correct countdown time.
  const initialDelay = 3;

  let end = Date.now() + (duration + 1) * 1000;
  let updateInterval;

  return {
    _durationString: "",
    _days: 0,
    _hours: 0,
    _minutes: 0,
    _seconds: 0,
    init() {
      [this._days, this._hours, this._minutes, this._seconds] = timeLeft(end);
      window.setTimeout(() => {
        // Resume time since screenshot should be done by now.
        let end = Date.now() + (duration + 1) * 1000;
        updateInterval = window.setInterval(() => {
          [this._days, this._hours, this._minutes, this._seconds] = timeLeft(
            end
          );
          this._durationString = getDurationString.bind(this)();
          if (
            [this._days, this._hours, this._minutes, this._seconds].reduce(
              (acc, u) => {
                acc = acc + u;
                return acc;
              },
              0
            ) === 0
          ) {
            // Countdown has finished.
            window.clearInterval(updateInterval);
          }
        }, 100);
      }, initialDelay * 1000);
    },
    getDays() {
      return ("00" + this._days).slice(-2);
    },
    getHours() {
      return ("00" + this._hours).slice(-2);
    },
    getMinutes() {
      return ("00" + this._minutes).slice(-2);
    },
    getSeconds() {
      return ("00" + this._seconds).slice(-2);
    },
    getDurationString() {
      return this._durationString;
    },
  };

  function timeLeft(end) {
    const DAY = 24 * 60 * 60 * 1000;
    const HOUR = 60 * 60 * 1000;
    const MINUTE = 60 * 1000;
    const now = Date.now();
    const days = Math.max(0, Math.floor((end - now) / DAY));
    const hours = Math.max(0, Math.floor((end - (now + days * DAY)) / HOUR));
    const minutes = Math.max(
      0,
      Math.floor((end - (now + days * DAY + hours * HOUR)) / MINUTE)
    );
    const seconds = Math.max(
      0,
      Math.floor(
        (end - (now + days * DAY + hours * HOUR + minutes * MINUTE)) / 1000
      )
    );
    return [days, hours, minutes, seconds];
  }

  function getDurationString() {
    return `P${this._days}DT${this._hours}H${this._minutes}M${this._seconds}S`;
  }
}
