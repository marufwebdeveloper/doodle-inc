import React, { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


function App() {

  const [category, setCategory] = useState([]);
  const [clickedCat, setClickedCat] = useState([]);
  const [getSelectedList,setSelectedList] = useState([]);

  useEffect(() => {      
        axios.get(`https://www.test.api.liker.com/get_categories`)
        .then(response => {
          setCategory(response.data.categories);
          console.log(response.data.categories);
        })
        .catch((error) => {
          console.log(error)
        });
  }, []);


  const catSubcat=category.map(function (v,i) {
    return <li key={i}>

      <p className={"cat-name "+((clickedCat[0]==v.category_id && clickedCat[1]==true)?' show-sub-cat':'')}  
        onClick={() => showSubCat(v.category_id)}>{v.category_name}</p>

      <p className="add-button" title="ADD" 
      onClick={() => addToList(v.category_id,'')}>+</p>

        <ul className={(clickedCat[0]==v.category_id && clickedCat[1]==true)?'fade-in':'fade-out'}>
          {v.subcatg.map(function (v2,i2) {
                return <li key={i2}>
                    <p className="cat-name">{v2.sub_category_name}</p> 
                    <p className="add-button" title="ADD" onClick={() => addToList(v2.sub_category_id,v.category_id)}>+</p>
                </li>;
          })}
        </ul>

    </li>;
  });

  function showSubCat($key){
    var toggleProp = [];
    if(clickedCat[0]==$key){
      toggleProp[1] = !clickedCat[1];
    } else{
      toggleProp[0] = $key;
       toggleProp[1] = true;
    } 
    setClickedCat(toggleProp)
  }

function addToList($id,$parent){
  category.forEach(function(v,i){
    var $data = {};
    if(!$parent){
      if(v.subcatg.length && v.category_id==$id){
        v.subcatg.forEach(function(v2,i2){
          if(checkDuplicate(v2.sub_category_id)){
            getSelectedList.push({id:v2.sub_category_id,name:v2.sub_category_name});
          }
        })
      } else if(v.category_id==$id && v.subcatg.length<1){
        if(checkDuplicate(v.category_id)){
          getSelectedList.push({id:v.category_id,name:v.category_name});
        }

      }
    } else if($parent==v.category_id){
      v.subcatg.forEach(function(v2,i2){
        if(v2.sub_category_id==$id && checkDuplicate(v2.sub_category_id)){
            getSelectedList.push({id:v2.sub_category_id,name:v2.sub_category_name});
          }
      })
    }
  })
  
  setSelectedList([...getSelectedList]);
}

function checkDuplicate($id){
  var $c = 0;
  getSelectedList.forEach(function(v,i){
    if($id==v.id){
      $c++;
    }
  })
  if($c){
    return false
  }else{
    return true
  }
}
function removeFromList($index){
  getSelectedList.splice($index, 1); 
  setSelectedList([...getSelectedList]);
}


  return (
    <div className="App">
      <div className="container-fluid mt-1">
        <div className="row">
          <div className="col-sm-6">          
            <ul className='category'>{catSubcat}</ul>
          </div>
          <div className="col-sm-6">
            <div className='selected-list'>
              {getSelectedList.map(function(v,i){
                return <p key={i} className="btn btn-xs btn-success m-1 selected-list">{v.name} 
                  <span className="remove-list" onClick={() => removeFromList(i)}>x</span>
                </p>
              })}

            </div>
          </div>        
        </div>
      </div>
    </div>
  );
}

export default App; 












