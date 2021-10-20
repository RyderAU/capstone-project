import "./Timetable.css";
import "./Timetable2.css";

const Timetable = () => {
  console.log("timetable loaded");
  return (
    <div>
      <div className="fc-view-container" style={{}}>
        <div className="fc-view fc-agendaWeek-view fc-agenda-view">
          <table className>
            <thead className="fc-head">
              <tr>
                <td className="fc-head-container fc-widget-header">
                  <div className="fc-row fc-widget-header">
                    <table className>
                      <thead>
                        <tr>
                          <th
                            className="fc-axis fc-widget-header"
                            style={{ width: "34px" }}
                          />
                          <th
                            className="fc-day-header fc-widget-header fc-mon fc-past"
                            data-date="2021-09-13"
                          >
                            <span>Mon</span>
                          </th>
                          <th
                            className="fc-day-header fc-widget-header fc-tue fc-past"
                            data-date="2021-09-14"
                          >
                            <span>Tue</span>
                          </th>
                          <th
                            className="fc-day-header fc-widget-header fc-wed fc-past"
                            data-date="2021-09-15"
                          >
                            <span>Wed</span>
                          </th>
                          <th
                            className="fc-day-header fc-widget-header fc-thu fc-past"
                            data-date="2021-09-16"
                          >
                            <span>Thu</span>
                          </th>
                          <th
                            className="fc-day-header fc-widget-header fc-fri fc-past"
                            data-date="2021-09-17"
                          >
                            <span>Fri</span>
                          </th>
                        </tr>
                      </thead>
                    </table>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody className="fc-body">
              <tr>
                <td className="fc-widget-content">
                  <div
                    className="fc-scroller fc-time-grid-container"
                    style={{ overflow: "hidden auto", height: "auto" }}
                  >
                    <div className="fc-time-grid fc-unselectable">
                      <div className="fc-bg">
                        <table className>
                          <tbody>
                            <tr>
                              <td
                                className="fc-axis fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td
                                className="fc-day fc-widget-content fc-mon fc-past"
                                data-date="2021-09-13"
                              />
                              <td
                                className="fc-day fc-widget-content fc-tue fc-past"
                                data-date="2021-09-14"
                              />
                              <td
                                className="fc-day fc-widget-content fc-wed fc-past"
                                data-date="2021-09-15"
                              />
                              <td
                                className="fc-day fc-widget-content fc-thu fc-past"
                                data-date="2021-09-16"
                              />
                              <td
                                className="fc-day fc-widget-content fc-fri fc-past"
                                data-date="2021-09-17"
                              />
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="fc-slats">
                        <table className>
                          <tbody>
                            <tr data-time="08:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>8am</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="08:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="09:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>9am</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="09:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="10:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>10am</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="10:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="11:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>11am</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="11:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="12:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>12pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="12:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="13:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>1pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="13:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="14:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>2pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="14:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="15:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>3pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="15:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="16:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>4pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="16:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="17:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>5pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="17:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="18:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>6pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="18:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="19:00:00">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              >
                                <span>7pm</span>
                              </td>
                              <td className="fc-widget-content" />
                            </tr>
                            <tr data-time="19:30:00" className="fc-minor">
                              <td
                                className="fc-axis fc-time fc-widget-content"
                                style={{ width: "34px" }}
                              />
                              <td className="fc-widget-content" />
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <hr
                        className="fc-divider fc-widget-header"
                        style={{ display: "none" }}
                      />
                      <div className="fc-content-skeleton">
                        <table>
                          <tbody>
                            <tr>
                              <td
                                className="fc-axis"
                                style={{ width: "34px" }}
                              />
                              <td>
                                <div className="fc-content-col">
                                  <div className="fc-event-container fc-helper-container" />
                                  <div className="fc-event-container">
                                    <a
                                      className="
                                fc-time-grid-event
                                fc-v-event
                                fc-event
                                fc-start
                                fc-end
                                un-bskt-registered
                              "
                                      style={{
                                        borderColor: "rgb(153, 153, 153)",
                                        inset: "194.625px 0% -292.188px",
                                        zIndex: 1,
                                      }}
                                    >
                                      <div className="fc-content">
                                        <div
                                          className="fc-time"
                                          data-start="12:00"
                                          data-full="12:00 PM - 2:00 PM"
                                        >
                                          <span>12:00 - 2:00</span>
                                          <span
                                            style={{
                                              position: "absolute",
                                              right: "2px",
                                            }}
                                          >
                                            Wks
                                          </span>
                                        </div>
                                        <div className="fc-title">
                                          COMP4920 - LEC
                                        </div>
                                        <div className="fc-title">Online</div>
                                      </div>
                                    </a>
                                  </div>
                                  <div className="fc-highlight-container" />
                                  <div className="fc-bgevent-container" />
                                  <div className="fc-business-container" />
                                </div>
                              </td>
                              <td>
                                <div className="fc-content-col">
                                  <div className="fc-event-container fc-helper-container" />
                                  <div className="fc-event-container">
                                    <a
                                      className="
                                fc-time-grid-event
                                fc-v-event
                                fc-event
                                fc-start
                                fc-end
                                un-bskt-registered
                              "
                                      style={{
                                        borderColor: "rgb(153, 153, 153)",
                                        inset: "194.625px 0% -292.188px",
                                        zIndex: 1,
                                      }}
                                    >
                                      <div className="fc-content">
                                        <div
                                          className="fc-time"
                                          data-start="12:00"
                                          data-full="12:00 PM - 2:00 PM"
                                        >
                                          <span>12:00 - 2:00</span>
                                          <span
                                            style={{
                                              position: "absolute",
                                              right: "2px",
                                            }}
                                          >
                                            Wks
                                          </span>
                                        </div>
                                        <div className="fc-title">
                                          COMP3900 - LEC
                                        </div>
                                        <div className="fc-title">Online</div>
                                      </div>
                                    </a>
                                  </div>
                                  <div className="fc-highlight-container" />
                                  <div className="fc-bgevent-container" />
                                  <div className="fc-business-container" />
                                </div>
                              </td>
                              <td>
                                <div className="fc-content-col">
                                  <div className="fc-event-container fc-helper-container" />
                                  <div className="fc-event-container">
                                    <a
                                      className="
                                fc-time-grid-event
                                fc-v-event
                                fc-event
                                fc-start
                                fc-end
                                un-bskt-registered
                              "
                                      style={{
                                        borderColor: "rgb(153, 153, 153)",
                                        inset: "292.188px 0% -389.75px",
                                        zIndex: 1,
                                      }}
                                    >
                                      <div className="fc-content">
                                        <div
                                          className="fc-time"
                                          data-start="2:00"
                                          data-full="2:00 PM - 4:00 PM"
                                        >
                                          <span>2:00 - 4:00</span>
                                          <span
                                            style={{
                                              position: "absolute",
                                              right: "2px",
                                            }}
                                          >
                                            Wks
                                          </span>
                                        </div>
                                        <div className="fc-title">
                                          COMP4920 - TUT
                                        </div>
                                        <div className="fc-title">Online</div>
                                      </div>
                                    </a>
                                    <a
                                      className="
                                fc-time-grid-event
                                fc-v-event
                                fc-event
                                fc-start
                                fc-end
                                un-bskt-registered
                              "
                                      style={{
                                        borderColor: "rgb(153, 153, 153)",
                                        inset: "487.312px 0% -584.375px",
                                        zIndex: 1,
                                      }}
                                    >
                                      <div className="fc-content">
                                        <div
                                          className="fc-time"
                                          data-start="6:00"
                                          data-full="6:00 PM - 8:00 PM"
                                        >
                                          <span>6:00 - 8:00</span>
                                          <span
                                            style={{
                                              position: "absolute",
                                              right: "2px",
                                            }}
                                          >
                                            Wks
                                          </span>
                                        </div>
                                        <div className="fc-title">
                                          COMP3900 - LAB
                                        </div>
                                        <div className="fc-title">Online</div>
                                      </div>
                                    </a>
                                  </div>
                                  <div className="fc-highlight-container" />
                                  <div className="fc-bgevent-container" />
                                  <div className="fc-business-container" />
                                </div>
                              </td>
                              <td>
                                <div className="fc-content-col">
                                  <div className="fc-event-container fc-helper-container" />
                                  <div className="fc-event-container" />
                                  <div className="fc-highlight-container" />
                                  <div className="fc-bgevent-container" />
                                  <div className="fc-business-container" />
                                </div>
                              </td>
                              <td>
                                <div className="fc-content-col">
                                  <div className="fc-event-container fc-helper-container" />
                                  <div className="fc-event-container" />
                                  <div className="fc-highlight-container" />
                                  <div className="fc-bgevent-container" />
                                  <div className="fc-business-container" />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
