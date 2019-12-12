list_count = 0
document.getElementById('create-list-btn').addEventListener('click', () => {
    list_string = document.getElementById('list-string')
    list_string.style.display = 'inline'
    list_string.focus()
    document.querySelector('#list-string').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode
        if (key === 13) { // 13 is enter
            if (list_string.value === '') {
                list_string.value = ''
                list_string.style.display = 'none'
            } else {
                console.log(list_string.value)
                list_string.style.display = 'none'
                node = document.createElement('p')
                node.setAttribute('id', 'p'+String(list_count+1))
                node.textContent = list_string.value
                document.getElementById('note-block').appendChild(node)
                
                list_string.value = ''
                list_count++
            }
        }
    })
})