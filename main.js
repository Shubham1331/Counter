document.addEventListener('DOMContentLoaded', function(){


    fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end/counter1.json')
    .then(res => res.json())
    .then(res => dataFeteched(res))
    .catch(err => alert(err))

    plus_btn = document.getElementById("plus-btn")
    minus_btn = document.getElementById("minus-btn")
    input_field = document.getElementById("input-val")
    counter_value = document.getElementById("counter")
    counter_value.innerText = input_field.value
    max_val = input_field.max;
    save_element = document.getElementById("saving")

    plus_btn.addEventListener("click",function(){
        if (input_field.value<max_val){
            input_field.value = parseInt(input_field.value) + 1 
            valueChange(counter_value,input_field.value)
            postdata(input_field.value,save_element)
        }
    })

    minus_btn.addEventListener("click",function(){
        input_field.value = parseInt(input_field.value) - 1 
        valueChange(counter_value,input_field.value)
        postdata(input_field.value,save_element)
    })

    input_field.addEventListener("change",function(){
        if (input_field.value > max_val){
            input_field.value = max_val;
        }

        valueChange(counter_value,input_field.value)
        postdata(input_field.value,save_element)
    })

    function valueChange(counter,value){
        counter.innerText = value
    }

})



function dataFeteched(data){
    if (data == null){
        max_val = 1000
    }else{
        max_val = data.Response
    }
    input_tag = document.getElementById("input-val")
    input_tag.max = max_val
}


function postdata(data1,element){
        element.classList.remove("hide")
        fetch('https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json', {
        method: 'PUT', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({shubham:data1}),
        })
        .then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        element.classList.add("hide")
        })
        .catch((error) => {
        console.error('Error:', error);
        });
}
