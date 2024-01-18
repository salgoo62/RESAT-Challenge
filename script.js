document.addEventListener('DOMContentLoaded', function () {
    const calendarContainer = document.getElementById('calendar');
    let currentMonth;
    let currentYear;
    let memos = {};
    let selectedDay;
    
    function drawCalendar() {
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    
        const calendarHTML = `<div id="calendar-header">
                                <button onclick="calendarApp.changeMonth(-1)">❮</button>
                                <h2 id="month-year">${calendarApp.getMonthName(currentMonth)} ${currentYear}</h2>
                                <button onclick="calendarApp.changeMonth(1)">❯</button>
                              </div>
                              <table id="calendar-table">
                                <thead>
                                  <tr>
                                    <th>일</th>
                                    <th>월</th>
                                    <th>화</th>
                                    <th>수</th>
                                    <th>목</th>
                                    <th>금</th>
                                    <th>토</th>
                                  </tr>
                                </thead>
                                <tbody>${calendarApp.generateCalendarDays(daysInMonth, firstDay)}</tbody>
                              </table>`;
    
        calendarContainer.innerHTML = calendarHTML;
    }
    
    function dayClickHandler(e) {
        let clickedElement = e.target;
        if (clickedElement.tagName.toLowerCase() == 'span') {
            clickedElement = clickedElement.parentElement;
        }
        if (clickedElement.tagName.toLowerCase() == 'td' && clickedElement.textContent) { 
            selectedDay = clickedElement;
            document.getElementById('memo-container').style.display = 'block';
            document.getElementById('memo-text').value = memos[`${currentYear}-${currentMonth}-${selectedDay.textContent}`] || '';
            document.getElementById('selected-date').textContent = `${currentYear}-${currentMonth+1}-${selectedDay.textContent}`;
        }
    }
    
    
    function editMemo() {
        document.getElementById('memo-container').style.display = 'block';
        document.getElementById('memo-text').value = memos[selectedDay.textContent] || '';
    }
    
    function cancelMemo() {
        document.getElementById('memo-container').style.display = 'none';
    }
    
    function saveMemo() {
        var memoText = document.getElementById('memo-text').value;
        memos[`${currentYear}-${currentMonth}-${selectedDay.textContent}`] = memoText;
        document.getElementById('memo-container').style.display = 'none';
        drawCalendar();
    }
    
    calendarContainer.addEventListener('click', dayClickHandler);
    document.getElementById('memo-cancel').addEventListener('click', cancelMemo);
    document.getElementById('memo-save').addEventListener('click', saveMemo);
    
    window.calendarApp = {
        createCalendar: function (year, month) {
            currentMonth = month;
            currentYear = year;
            drawCalendar();
        },
    
        generateCalendarDays: function (daysInMonth, firstDay) {
            let calendarDaysHTML = '';
            let dayCount = 1;
    
            for (let i = 0; i < 6; i++) {
                calendarDaysHTML += '<tr>';
    
                for (let j = 0; j < 7; j++) {
                    if ((i === 0 && j < firstDay) || dayCount > daysInMonth) {
                        calendarDaysHTML += '<td></td>';
                    } else {
                        // 메모가 있는지 확인
                        const memoClass = memos[`${currentYear}-${currentMonth}-${dayCount}`] ? ' memo-day' : '';
                        calendarDaysHTML += `<td><span class="date-number${memoClass}">${dayCount}</span></td>`;
                        dayCount++;
                    }
                }
        
                calendarDaysHTML += '</tr>';
            }
        
            return calendarDaysHTML;
        },
    
        changeMonth: function (diff) {
            currentMonth += diff;
    
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            } else if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
    
            calendarApp.createCalendar(currentYear, currentMonth);
        },
    
        getMonthName: function (month) {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return monthNames[month];
        }
    };
    
    const currentDate = new Date();
    calendarApp.createCalendar(currentDate.getFullYear(), currentDate.getMonth());
    });