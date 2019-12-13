list_count = 0
document.getElementById('create-block-btn').addEventListener('click', () => {
    insert_string = document.getElementById('insert-string')
    insert_string.style.display = 'block'
    insert_string.focus()
    document.querySelector('#insert-string').addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode
        if (key === 13) { // 13 is enter
            if (insert_string.value === '') {
                insert_string.value = ''
                insert_string.style.display = 'none'
            } else {
                note_block = document.getElementById('note-block')
                insert_block = document.createElement('div')
                insert_block.textContent = insert_string.value
                note_block.insertBefore(insert_block, note_block.lastElementChild)
                
                insert_string.style.display = 'none'
                insert_string.value = ''
                list_count++
            }
        }
    })
})

document.getElementById('insert-string').addEventListener('focusout', () => {
    insert_string = document.getElementById('insert-string')
    insert_string.style.display = 'none'
    insert_string.value = ''
})