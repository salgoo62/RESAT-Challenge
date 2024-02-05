document.getElementById('add-todo').addEventListener('click', function() {
    var value = document.getElementById('new-todo').value;
    var priority = document.getElementById('priority').options[document.getElementById('priority').selectedIndex].text;
    if (value) {
        addItemToList(value, priority);
        document.getElementById('new-todo').value = "";
    }
});

var itemId = 0;

function addItemToList(text, priority) {
    var list = document.getElementById('todo-list');

    var item = document.createElement('li');
    item.className = 'todo-item';

    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.id = 'todo-item-' + itemId;
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            item.className = 'todo-item completed';
        } else {
            item.className = 'todo-item';
        }
    });

    var label = document.createElement('label');
    label.innerText = text;
    label.htmlFor = checkbox.id;
    label.className = "content content-" + document.getElementById('priority').value;

    var priorityLabel = document.createElement('span');
    priorityLabel.innerText = priority;
    priorityLabel.className = "priority priority-" + document.getElementById('priority').value;

    var editButton = document.createElement('button'); // 수정 버튼을 생성
    editButton.innerText = '수정'; 
    editButton.addEventListener('click', function() { // 버튼 클릭 이벤트를 추가
        var newText = prompt("📝 수정할 내용을 입력하세요 ", text); // 사용자에게 새로운 할 일을 입력받음
        if (newText) {
            label.innerText = newText; // 사용자가 새로운 할 일을 입력했다면, 해당 항목의 텍스트를 업데이트
        }
    });

    var deleteButton = document.createElement('button'); // 삭제 버튼을 생성
    deleteButton.innerText = '삭제'; // 버튼의 텍스트를 설정합니다.
    deleteButton.addEventListener('click', function() { // 버튼 클릭 이벤트를 추가
        this.parentNode.remove(); 
    });

    item.appendChild(checkbox);
    item.appendChild(label);
    item.appendChild(priorityLabel);
    item.appendChild(editButton); 
    item.appendChild(deleteButton);
    list.insertBefore(item, list.childNodes[0])
    itemId++;
}

document.querySelectorAll('.filter-btn').forEach(function(button) {
    button.addEventListener('click', function() {
        var state = button.textContent;
        filterList(state);
        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.classList.remove('active');
        });
        button.classList.add('active');
    });
});

function filterList(state) {
    var items = document.querySelectorAll('.todo-item');

    items.forEach(function(item) {
        switch(state) {
            case '전체':
                item.style.display = 'flex';
                break;
            case '완료':
                if (item.classList.contains('completed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
            case '미완료':
                if (!item.classList.contains('completed')) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
                break;
        }
    });
}

var sortState = 0; // 정렬 상태 0은 초기 상태, 1은 높은 우선순위 순, -1은 낮은 우선순위 순

document.getElementById('sort-priority').addEventListener('change', function() {
    var list = document.getElementById('todo-list');
    var items = Array.from(list.children); 

    var sortState = parseInt(this.value); 

    items.sort(function(a, b) {
        var priorityA = a.querySelector('.priority').innerText;
        var priorityB = b.querySelector('.priority').innerText;

        var priorityMap = { 
            '아주 높음': 4,
            '높음': 3,
            '보통': 2,
            '낮음': 1
        };


        if (sortState === 1) {
            // 높은 우선순위 순으로 정렬
            return priorityMap[priorityB] - priorityMap[priorityA];
        } else if (sortState === -1) {
            // 낮은 우선순위 순으로 정렬
            return priorityMap[priorityA] - priorityMap[priorityB];
        }
    });


   
    items.forEach(function(item) {
        list.appendChild(item);
    });

    // 정렬 상태를 변경
    if (sortState === 0 || sortState === -1) {
        sortState = 1;
    } else {
        sortState = -1;
    }
});
