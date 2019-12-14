let fs = require('fs')

note_block = document.getElementById('note-block')
list_count = 0

write_file = () => {
    content = ''
    for (node of note_block.childNodes) {
        if (node.nodeName === 'DIV' && node.id !== 'create-block-btn') {
            content += node.textContent+'\n'
        }
    }
    fs.writeFile('./list-content.txt', content, function(err) {})
}
create_block = (text) => {
    insert_block = document.createElement('div')
    insert_block.textContent = text
    note_block.insertBefore(insert_block, note_block.lastElementChild)
}
window.onload = () => {
    fs.readFile('./list-content.txt', (err, data) => {
        if (err) throw err
        line = ''
        for (c of data.toString()) {
            if (c === '\n') {
                list_count++
                create_block(line)
                line = ''
            } else {
                line = line + c
            }
        }
        if (line !== '') create_block(line)
    })
}

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
                create_block(insert_string.value)

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