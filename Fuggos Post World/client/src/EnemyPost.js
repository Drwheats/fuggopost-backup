import {CgTrash} from "react-icons/cg";
import {FiMinusCircle} from "react-icons/fi";
import {useState} from "react";

export default function EnemyPost({enemyPostName, enemyPostBody, enemyPostNumber, motherPost, nestedReplies, timePosted}) {
    const [fullRes, setFullRes] = useState()
    function deletePost(){
        let json_body = JSON.stringify(
            { postName: enemyPostBody, postNumber: enemyPostNumber, motherPost: motherPost, isReply: true, nestedReplies: nestedReplies})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        // console.log(scoreJSON)
        //"http://localhost:3001/delete"
        // fetch("https://fuggo-374704.uw.r.appspot.com/delete", scoreJSON)
        fetch("http://localhost:3001/delete", scoreJSON)

            .then(response => response.json());
        document.getElementById("reply"+enemyPostNumber).style.display = "none";
    }
    function hidePost(){
        let plusSign = document.createElement('span')
        plusSign.innerHTML = "+";
        plusSign.id = "plusSign" + document.getElementById("reply"+enemyPostNumber);
        plusSign.postNumber = document.getElementById("reply"+enemyPostNumber);
        // plusSign.setAttribute("onClick", "console.log(document.getElementById('reply'+this))");
        plusSign.setAttribute("onClick", "this.postNumber.style.display = 'block'; this.style.display = 'none'");
        plusSign.className = "plusGuy"
        document.getElementById("reply"+enemyPostNumber).style.display = "none";
        // document.getElementById("reply"+postNumber).parentElement.append(plusSign)
        document.getElementById("reply"+enemyPostNumber).parentNode.insertBefore(plusSign, document.getElementById("reply"+enemyPostNumber).nextSibling);
    }
    function formatDate() {
        let currentTime = new Date(timePosted)
        timePosted =String(currentTime)
        timePosted = timePosted.split(' ').slice(0, 5).join(' ')
        return timePosted
    }
    function clickReply() {
        document.getElementById("mainTextSubmit").value += "@" + enemyPostNumber + ">"
    }
    function showFullRes() {
        if (!fullRes){
            document.getElementById("enemyPostImage"+enemyPostNumber).style.maxHeight = "100%"
            document.getElementById("enemyPostImage"+enemyPostNumber).style.maxWidth = "100%"
            setFullRes(true);
        }
        else {
            document.getElementById("enemyPostImage"+enemyPostNumber).style.maxHeight = "100px"
            document.getElementById("enemyPostImage"+enemyPostNumber).style.maxWidth = "100px"
            setFullRes(false)
        }
    }


    return (
        <div className="enemyPostHolder" datatype={enemyPostBody} id={"reply"+enemyPostNumber}>
            <div className="replyHeaderHolder">
          <span className="replyMinusSign">
                        <FiMinusCircle onClick={hidePost}/>
                    </span>                    <span >{nestedReplies.map((reply) => {

                return <a name={"topReply"} className="inlineReply2" href={"/post/" + motherPost + "#reply"+reply} key={reply}>>>{reply}
                </a>
                // this.textFloat = document.getElementById("reply"+reply).innerText

            })} </span>

                <span className="replyTrashSign">
                       <CgTrash onClick={deletePost} />        <span>
                </span>
                    </span>
            </div>
                <div className="enemyPostHeader">
                    <a href="#mainTextSubmit" onClick={clickReply} className="enemyPostNumber">#{enemyPostNumber}</a><h5 className="enemyPostName">name: {enemyPostName}
                </h5> <h5 className="enemyTimeStamp">{formatDate()}</h5>                    <img alt="" onClick={showFullRes} className="enemyPostImage" id={"enemyPostImage"+enemyPostNumber} src={"http://localhost:3001/fuggosimageworld/"+enemyPostNumber+".png"} />

                </div>


                <span className="enemyPostText" id={"enemyPostText"+enemyPostNumber}></span>


        </div>
)
}