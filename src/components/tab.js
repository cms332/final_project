import '../App.css';
import React from 'react';

const TabSection = React.memo(({setcurTab = () => {}}) => {

  // console.log("출ㅇㅇㅇ력" + setcurTab);
  return (
    <div className="tabContainer">
        <button onClick={() => setcurTab(1)}>내 지역보기</button>
        <button onClick={() => setcurTab(2)}>전체 시도보기</button>
        <button onClick={() => setcurTab(3)}>즐겨찾기</button> 
    </div>
  )
});

export default TabSection;