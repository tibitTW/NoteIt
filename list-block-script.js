let fs = require('fs')

note_block = document.getElementById('note-block')
list_count = 0

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
    del_block_btn_init()
}

update_file = () => {
    content = ''
    for (node of note_block.childNodes) {
        if (node.nodeName === 'DIV' && node.id !== 'create-block-btn') {
            content += node.textContent + '\n'
        }
    }
    fs.writeFile('./list-content.txt', content, function (err) { })
}

create_block = (text) => {
    insert_block = document.createElement('div')
    // insert_block.setAttribute('id', list_count)
    insert_block.textContent = text
    insert_block.innerHTML += '<div id="' + list_count + '" class="delete-block-btn"></div>'
    note_block.insertBefore(insert_block, note_block.lastElementChild)
    update_file()

}

delete_block = (n) => {
    note_block.childNodes[n].remove()
    update_file()
}

del_block_btn_init = () => {
    var del_block_btn = document.querySelectorAll('.delete-block-btn')
    del_block_btn.forEach((btn) => {
        console.log('whats up')
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

for (del_block_btn of document.querySelectorAll('.delete-block-btn')) {
    del_block_btn.addEventListener('click', () => {
        console.log('hi')
    })
}