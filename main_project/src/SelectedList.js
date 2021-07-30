import React, { useEffect, useState } from "react";

function SelectedList(props){
  const [getSelectedList,setSelectedList] = useState([{abc:123}]);

  
  const selectedList=getSelectedList.map(function (v,i) {
      console.log('sdfsdf');
      return 'abc';
  })
  return (
    <>
      <div>
        {selectedList}
      </div>
    </>
  )
}

export default SelectedList;












