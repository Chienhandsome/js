let soKyNang = 0

const tableBody = document.getElementById('table-body')

const hotenreg = /^([A-Z][a-z]+)(\s[A-Z][a-z]+)+$/
const sdtreg = /^(09|03|08)\d{8}$/
const gmailreg = /^[\w.-]+@[\w.-]+\.com$/
const emailreg = /^[a-zA-Z0-9._%+-]+@iuh\.edu\.vn$/

const hotenf = document.getElementById('hotenf')
const ngaysinhf = document.getElementById('ngaysinhf')
const sdtf = document.getElementById('sdtf')
const emailf = document.getElementById('emailf')
const khoahocf = document.getElementById('khoahocf')
const thoigianhocf = document.getElementById('thoigianhocf')
const avtf = document.getElementById('avtf')

const radio1 = document.getElementById('radio1')
const radio2 = document.getElementById('radio2')

const check1 = document.getElementById('check1')
const check2 = document.getElementById('check2')
const check3 = document.getElementById('check3')

thoigianhocf.value = khoahocf.value

khoahocf.addEventListener('change', function () {
    thoigianhocf.value = khoahocf.value
})

document.getElementById('btnsave').addEventListener('click', function () {
    const newRow = document.createElement('tr')

    const ngaySinh = new Date(ngaysinhf.value)
    const ngayHienTai = new Date()

    if (ngaySinh > ngayHienTai) {
        document.getElementById('ngaysinhnote').innerText = 'Ngay sinh phai truoc ngay hien tai'
        return
    } else {
        document.getElementById('ngaysinhnote').innerText = ''
    }
    const fmDate = `${ngaySinh.getDay().toString()}-${ngaySinh.getMonth().toString()}-${ngaySinh.getFullYear().toString()}`

    if (!hotenreg.test(hotenf.value)) {
        document.getElementById('hotennote').innerText = 'Ten khong hop le'
        hotenf.focus()
        return
    } else {
        document.getElementById('hotennote').innerText = ''
    }

    if (hotenf.value == '') {
        document.getElementById('hotennote').innerText = 'Ten khong duoc rong'
        hotenf.focus()
        return
    } else {
        document.getElementById('hotennote').innerText = ''
    }

    if (!sdtreg.test(sdtf.value)) {
        document.getElementById('sdtnote').innerText = 'SDT khong hop le'
        sdtf.focus()
        return
    } else {
        document.getElementById('sdtnote').innerText = ''
    }

    if (sdtf.value == '') {
        document.getElementById('sdtnote').innerText = 'SDT khong duoc rong'
        sdtf.focus()
        return
    } else {
        document.getElementById('sdtnote').innerText = ''
    }

    if (!emailreg.test(emailf.value)) {
        document.getElementById('emailnote').innerText = 'email khong hop le'
        emailf.focus()
        return
    } else {
        document.getElementById('emailnote').innerText = ''
    }

    if (avtf.files[0] == null) {
        document.getElementById('avtnote').innerText = 'chua chon anh'
        return
    }

    if (check1.checked) soKyNang++
    if (check2.checked) soKyNang++
    if (check3.checked) soKyNang++

    if (soKyNang == 0) {
        document.getElementById('kinangnote').innerText = 'vui long chon it nhat 1 ki nang'
        return
    }

    newRow.innerHTML = `
                <td>${tableBody.children.length + 1}</td>
                <td>${hotenf.value}</td>
                <td>${fmDate}</td>
                <td>${sdtf.value}</td>
                <td>${emailf.value}</td>
                <td>${khoahocf.options[khoahocf.selectedIndex].text}</td>
                <td>${thoigianhocf.value}</td>
                <td>${soKyNang}</td>
                <td><img src="${URL.createObjectURL(avtf.files[0])}" alt="" srcset="" height="25px"></td>
            `

    tableBody.appendChild(newRow)

    document.querySelector('.modal-body form').reset()
    const modal = bootstrap.Modal.getInstance(document.getElementById('modalId'))
    modal.hide()
})
