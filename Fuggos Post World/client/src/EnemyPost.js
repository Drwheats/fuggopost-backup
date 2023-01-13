import {CgTrash} from "react-icons/cg";
import {FiMinusCircle} from "react-icons/fi";

export default function EnemyPost({enemyPostName, enemyPostBody, enemyPostNumber, motherPost, nestedReplies, timePosted}) {
    // console.log("nestedReplies Prop for " + enemyPostNumber + " is: " + nestedReplies)
    // const [data, setData] = useState('')

    function deletePost(){
        let json_body = JSON.stringify(
            { postName: enemyPostBody, postNumber: enemyPostNumber, motherPost: motherPost, isReply: true, nestedReplies: nestedReplies})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        // console.log(scoreJSON)
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
    return (
        <div className="enemyPostHolder" datatype={enemyPostBody} id={"reply"+enemyPostNumber}>
            <div className="replyHeaderHolder">
          <span className="replyMinusSign">
                        <FiMinusCircle onClick={hidePost}/>
                    </span>                    <span >{nestedReplies.map((reply) => {
                // v if we are going to come back to making the top reply list interactive, set id={"inlineReply"+reply} v
                // let gotem = 0;
                // try{                        gotem = document.getElementById("reply"+reply).innerText
                //     console.log(gotem)}
                // catch (e){
                //     gotem = e}
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
                    <h6 className="enemyPostNumber">#{enemyPostNumber}</h6><h5 className="enemyPostName">name: {enemyPostName}
                </h5> <h5 className="enemyTimeStamp">{formatDate()}</h5>
                </div>
                <span className="enemyPostText" id={"enemyPostText"+enemyPostNumber}></span>


        </div>
)
}