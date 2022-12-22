const form = document.getElementsByTagName('form')
let flag = false

const input = document.getElementsByTagName('input')
console.log(input)

// validation funtion
form[0].addEventListener('submit', (e) => {
    e.preventDefault()

    const error = [...Array(7)]
    console.log(input[0].value, input[0].value.length)

    let regex = /^[a-zA-Z0-9]*$/

    !regex.test(input[0].value) ? error[0] = 'enter valid fullName' : error[0] = ''
    input[0].value.length < 3 ? error[0] += '  length should be atleast 3' : error[0] += ''

    !regex.test(input[0].value) ? error[1] = 'enter valid fullName' : error[1] = ''
    input[1].value.length < 3 ? error[1] += '  length should be atleast 3' : error[1] += ''

    let userRG = /^[a-zA-Z0-9.]*$/
    !userRG.test(input[2].value) ? error[2] = 'enter valid userName' : error[2] = ''
    input[2].value.length === 0 ? error[2] += '  username is required' : error[2] += ''


    let mailFormat = /^\S+@\S+\.\S+$/
    !mailFormat.test(input[3].value) ? error[3] = 'enter valid email' : error[3] = ''
    input[3].value.length === 0 ? error[3] += '   required' : error[3] += ''


    input[4].value.length < 1 ? error[4] = 'address is required' : error[4] = ''


    var phoneNo = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    !phoneNo.test(input[5].value) ? error[5] = 'enter valid number' : error[5] = ''
    input[5].value.length < 10 ? error[5] += '  length should be 10' : error[5] += ''

    !checkUrl(input[6].value) ? error[6] = 'enter valid website' : error[6] = ''
    input[6].value.length===0?error[6]='':error[6]=error[6]

       // showing errors
       const pErrors = document.getElementsByTagName('p') 
       console.log(error)
       error.map((single, i) => {
             
              pErrors[i].innerHTML=single
              pErrors[i].style.color='red'            
       })

// submit form
    if (error.every((e) => e === '')) {
        const formData = {
            firstName: input[0].value, lastName: input[1].value, userName: input[2].value, email: input[3].value,
            address: input[4].value, phone: input[5].value, website: input[6].value, companyName: input[7].value
        }

     if (!sessionStorage.getItem("dataObj")) { sessionStorage.setItem('dataObj', JSON.stringify([])) }

        const arr = [...JSON.parse(sessionStorage.getItem('dataObj'))]
        arr.push(formData)
        sessionStorage.setItem('dataObj', JSON.stringify(arr))
        dataRender(true, formData)
        alert('submitted')
        for (let i = 0; i < input.length; i++) { input[i].value = '' }
    }
    
       
})

// website url check
const checkUrl = (url) => {
    try {
        return Boolean(new URL(url))
    }
    catch (e) {
        return false
    }
}



// form data rendering
const dataRender = async (form, formData) => {
    if (!form) {
        let data = await JSON.parse(sessionStorage.getItem('dataObj'))
        console.log(data)
        if (data) {
            const elem = document.getElementById('append')
            console.log(data[0].firstName)
            for (let i = 0; i <= data.length; i++) {
                const text = `
        <td>${i + 11}</td>
          <td>${data[i].firstName + ' ' + data[i].lastName}</td>
          <td>${data[i].userName}</td>
          <td>${data[i].email}</td>
          <td>${data[i].address}</td>
          <td>${data[i].phone}</td>
          <td>${data[i].website}</td>
          <td>${data[i].companyName}</td>
          
   `
                const row = document.createElement('tr')
                row.innerHTML = text
                elem.appendChild(row)
            }
        }
    }
    // only formadata appending
    else {
        const elem = document.getElementById('append')
        const len = document.getElementsByTagName('tr').length
        console.log(len)
        const text = `
    <td>${len}</td>
      <td>${formData.firstName + ' ' + formData.lastName}</td>
      <td>${formData.userName}</td>
      <td>${formData.email}</td>
      <td>${formData.address}</td>
      <td>${formData.phone}</td>
      <td>${formData.website}</td>
      <td>${formData.companyName}</td>
      
`
        const row = document.createElement('tr')
        row.innerHTML = text
        elem.appendChild(row)
    }
}


// api data rendering
const appendData = (data) => {
    console.log(data)
    const elem = document.getElementById('append')
    data.forEach((single) => {
        const row = document.createElement('tr')
        const temp = single.address
        const text = `
        <td>${single.id}</td>
        <td>${single.name}</td>
        <td>${single.username}</td>
        <td>${single.email}</td>
        <td>${temp.street + ',' + temp.suite + ',' + temp.city + ',' + temp.zipcode}</td>
        <td>${single.phone}</td>
        <td>${single.website}</td>
        <td>${single.company.name}</td>`

        row.innerHTML = text
        elem.appendChild(row)
    })
    dataRender(false)
}
// fetching api data
const getApiData = async () => {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users')
        const data = await res.json()
        console.log(data)
        appendData(data)
    }
    catch (e) {
        console.log(e)
        alert('something went wrong while fetching the users')
    }

}
getApiData()