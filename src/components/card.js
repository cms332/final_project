import '../App.css';
import React from 'react';
import MenuSection from './menu';

const CardSection = React.memo(({curTab, curSidoName, setcurSidoName, datas, bookmarks, updateBookmarks}) => {
  const checkGrade = (grade) => {
    let str;
    switch (grade) {
      case '1':
        str = "좋음";
        break;
      case '2':
        str = "보통";
        break;
      case '3':
        str = "한때나쁨";
        break;
      case '4':
        str = "나쁨";
        break;
      case '5':
        str = "매우나쁨";
        break;
      default:
        str = "알수없음";
    }

    return str;
  } 

  const checkColorByGrade = (grade) => {
    let str;
    switch (grade) {
      case '1':
        str = "#557EF8";
        break;
      case '2':
        str = "#44D271";
        break;
      case '3':
        str = "#FCDC00";
        break;
      case '4':
        str = "#FB9249";
        break;
      case '5':
        str = "#D33115";
        break;
      default:
        str = "gray";
    }

    return str;
  } 

  const changeHandler = (targetArr, event) => {
    // updateBookmarks(event);
    updateBookmarks(targetArr[event.target.name], event.target.checked);
    //  console.log(event.target.name);
    //  console.log(event.target.checked);
    //  console.log(targetArr[event.target.name]);
  }

  //현재 데이터가 북마크
  const isBookmarked = (data) => {
    const identifier = data.sidoName + data.stationName;
    // 있으면 true
    if(bookmarks[identifier]) {
      return true;
    }
    else {
      return false;
    }
  }

  // 렌더하기 전에 curTab을 보고 그에 맞게 render한다.
  const showTab = () => {
    if(curTab === 1) {
      return (<div>
        <div className="request"><p>내 지역보기</p></div>
      </div>)
    } else if(curTab === 2) {
      return (
        <div>
          <MenuSection curSidoName={curSidoName} setcurSidoName={setcurSidoName} />{getCards(datas)}
        </div>
      )
    } else {
      if (Object.keys(bookmarks).length === 0) {
        return (
          <div className="request"><p>즐겨찾기를 먼저 추가해 주십시오.</p></div>
        )
      } else {
        return getBookmarks(Object.values(bookmarks));
      }
    }
  }


  // getCards 같은 거 3개 만들고 조건에 따라 리턴을 달리한다.

  const getBookmarks = (cards) => cards.map( (data, index) => {
    return (
        <div className="card" style={{ backgroundColor: checkColorByGrade(data.pm10Grade) }}>
        <div className="flexContainer">
          <div className="station">{data.stationName}</div><div className="sido">{data.sidoName}</div>
          <div className="bookmark">
            <label>
              <input type="checkbox" name={index} checked={isBookmarked(data)} onChange={(e) => changeHandler(Object.values(bookmarks),e)}/>즐겨찾기
            </label>
          </div>
        </div>
        <div className="status">
          <div className="check" style={{ color: checkColorByGrade(data.pm10Grade) }}>{checkGrade(data.pm10Grade)}</div>
        </div>
        <div className="info">
          <div>
            미세먼지 수치 : {data.pm10Value}
          </div>
          <div>
            ({data.dataTime})
          </div>
        </div>
      </div>
    )
  });


  const getCards = (cards) => cards.map( (data, index) => {
    return (
        <div className="card" style={{ backgroundColor: checkColorByGrade(data.pm10Grade) }}>
        <div className="flexContainer">
          <div className="station">{data.stationName}</div><div className="sido">{data.sidoName}</div>
          <div className="bookmark">
            <label>
              <input type="checkbox" name={index} checked={isBookmarked(data)} onChange={(e) => changeHandler(datas,e)}/>즐겨찾기
            </label>
          </div>
        </div>
        <div className="status">
          <div className="check" style={{ color: checkColorByGrade(data.pm10Grade) }}>{checkGrade(data.pm10Grade)}</div>
        </div>
        <div className="info">
          <div>
            미세먼지 수치 : {data.pm10Value}
          </div>
          <div>
            ({data.dataTime})
          </div>
        </div>
      </div>
    )
  });


  //리턴
  return (
    <div>
      {showTab()}
    </div>
  )
});

export default CardSection;