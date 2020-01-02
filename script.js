window.$ = window.jQuery = require('jquery')
const fs = require('fs')

$(document).ready(function () {
    fs.readFile('./list-content.txt','utf-8', function (err, data) {
        if (err) {
            return console.log(err)
        } else {
            text = ''
            for (c of data) {
                if (c === '\n') {
                    create_block(text)
                    text = ''
                } else {
                    text += c
                }
            }
            if (data[-1] !== '\n' && text !== '') {
                create_block(text)
            }
        }
    })
})

function last_load() {
    $('.delete-block-btn').click(function () {
        $(this).parent().remove()
        upload_file()
    })
}
window.addEventListener("load", function () {
    window.setTimeout(last_load, 1000)
}, false)

$('.create-block-btn').click(function () {
    insert_string = $('.insert-string')
    insert_string.show().focus().keypress(function (e) {
        var key = e.which || e.keyCode
        console.log(key)
        if (key === 13) {
            if (insert_string.val() === '') {
                insert_string.hide()
            } else {
                create_block(insert_string.val())
                insert_string.hide().val('')
            }
        }
    })
})

$('.insert-string').focusout(function () {
    $(this).hide().val('')
})

function create_block(text) {
    $('<div/>', {
        'class': 'block block-btn',
        'text': text,
    }).html(text + '<div class="delete-block-btn"></div>').appendTo('#note-block')
    $('.delete-block-btn').last().click(function () {
        $(this).parent().remove()
    })
    upload_file()
}

function upload_file() {
    text_content = ''
    $('.block').each(function () {
        text_content += $(this).text() + '\n'
    })
    fs.writeFile('list-content.txt', text_content, function (err) { })
}