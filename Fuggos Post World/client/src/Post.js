import { CgTrash } from "react-icons/cg";
import {FiMinusCircle} from "react-icons/fi";


export default function Post({postName, postTopic, postBody, postNumber, postVisibility, postNumberReplies, timePosted}) {

    function formatDate() {
        let currentTime = new Date(timePosted)
        timePosted =String(currentTime)
        timePosted = timePosted.split(' ').slice(0, 5).join(' ')
    }

    function deletePost(){

        let json_body = JSON.stringify(
            { postName: postBody, postNumber: postNumber, isReply: false})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }

        console.log(scoreJSON)
        fetch("http://localhost:3001/delete", scoreJSON)
            .then(response => response.json());
        document.getElementById("reply"+postNumber).style.display = "none";
    }

    function hidePost(){
        let plusSign = document.createElement('span')
        plusSign.innerHTML = "+";
        plusSign.id = "plusSign" + document.getElementById("reply"+postNumber);
        plusSign.postNumber = document.getElementById("reply"+postNumber);
        plusSign.setAttribute("onClick", "this.postNumber.style.display = 'block'; this.style.display = 'none'");
        plusSign.className = "plusGuy"
        console.log(plusSign.id)
        document.getElementById("reply"+postNumber).style.display = "none";
        // document.getElementById("reply"+postNumber).parentElement.append(plusSign)
        document.getElementById("reply"+postNumber).parentNode.insertBefore(plusSign, document.getElementById("reply"+postNumber).nextSibling);
    }

    formatDate();
    return (

        <div className="postHolder" id={"reply"+ postNumber}>
        {/*<img src="img_avatar.png" alt="Avatar" style="width:100%">*/}
            <h5 className="postHeader"> <FiMinusCircle onClick={hidePost}/> #{postNumber} {postName}     <span className="trashHolder">{ timePosted }<CgTrash onClick={deletePost}/> </span>       </h5>

            <a className="postTopic" id={"reply"+ postNumber} href={"/post/"+postNumber}>{postTopic} </a>
            <div href={"/post/" + postNumber}>

            <p className="postText" >{postBody}</p>
            </div>
            <a href={"/post/" + postNumber} className="postFooter"
                ><h5 className="replies">Replies: {postNumberReplies} <span className="replyNow">Reply Now</span></h5></a>
        </div>
)
}