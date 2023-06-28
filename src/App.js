import { useCallback, useEffect, useState } from "react"
import CardSection from "./components/card";
// import MenuSection from "./components/menu";
import TabSection from "./components/tab";


function App() {
  const [apiData, setapiData] = useState([]);
  const [bookmarks, setbookmarks] = useState({});
  const [curSidoName, setcurSidoName] = useState("서울");
  const [curTab, setcurTab] = useState(2);

  const getParameters = {
    serviceKey: 'SxfHWW%2BzFsgjXSW5WXfs%2B5RYD2IVnRtS1ngefrHm%2BlMjHtRzIrsoTmGliJ4uiArB5xmGuse0F8JIVhLkvzoY1Q%3D%3D',
    returnType:'json',
    numOfRows:'100',
    pageNo:'1',
    sidoName: curSidoName,
    ver:'1.0'
  };
  
  const url = 'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty'
  + '?serviceKey=' + getParameters.serviceKey 
  + '&returnType=' + getParameters.returnType 
  + '&numOfRows=' + getParameters.numOfRows
  + '&pageNo=' + getParameters.pageNo
  + '&sidoName=' + curSidoName
  + '&ver=' + getParameters.ver

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      
      // const info = data.response.body.items;
      // console.log(info);
      setapiData(data.response.body.items);
      // console.log(apiData);
    })
  },[curSidoName, url]); // 시도가 바뀌었는지 확인해서 바뀌었으면 다시 받아옴 전용 state 추가해야함
  
  //  북마크 관리 함수
  const updateBookmarks = useCallback((content, checked) => {
    // 체크되었고 현재 리스트에 없으면 추가, 체크해제되었으면 제거
    const identifier = content.sidoName + content.stationName;
    const newBookmarks = {...bookmarks};

    if(checked && !newBookmarks[identifier]) {
      newBookmarks[identifier] = content;
      setbookmarks(newBookmarks);
      console.log("추가");
    }
    else {
      delete newBookmarks[identifier];
      setbookmarks(newBookmarks);
      console.log("제거");
    }     
  },[bookmarks]);

  //기본 화면으로 상단에 지역 선택 드랍 다운 메뉴
  //메뉴, 카드, 탭 컴포넌트
  // console.log("출력" + setcurTab + " :" + curTab);
  return (
    <div className="container">
      <CardSection curTab={curTab} curSidoName={curSidoName} setcurSidoName={setcurSidoName} datas={apiData} bookmarks={bookmarks} updateBookmarks={updateBookmarks} />
      <TabSection setcurTab={setcurTab} />
      {/* <button onClick={() => {console.log(bookmarks)}}>state 추적용 리포트 버튼</button> */}
    </div>
  );
}

export default App;
