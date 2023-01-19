import { CgTrash } from "react-icons/cg";
import {FiMinusCircle} from "react-icons/fi";
import theScream from './public/theScream.png'
import {useState} from "react";


export default function Post({postName, postTopic, postBody, postNumber, postVisibility, postNumberReplies, timePosted, replies}) {
    const [fullRes, setFullRes] = useState();

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
    function trimReplies() {
        let random = replies.sort(() => .5 - Math.random()).slice(0,3)
        return random;
    }
    function showFullRes() {
        if (!fullRes){
            document.getElementById("postImage"+postNumber).style.maxHeight = "100%"
            document.getElementById("postImage"+postNumber).style.maxWidth = "100%"
            setFullRes(true);
        }
        else {
            document.getElementById("postImage"+postNumber).style.maxHeight = "100px"
            document.getElementById("postImage"+postNumber).style.maxWidth = "100px"
            setFullRes(false)
        }
    }
    formatDate();
    return (

        <div className="postHolder" id={"reply"+ postNumber}>
            <h5 className="postHeader"> <FiMinusCircle onClick={hidePost}/> #{postNumber} {postName}     <span className="trashHolder">{ timePosted }<CgTrash onClick={deletePost}/> </span>       </h5>

            <h0 className="postTopic" id={"reply"+ postNumber} href={"/post/"+postNumber}> <a href={"/post/"+postNumber} >{postTopic} </a>           <img alt="" onClick={showFullRes} id={"postImage"+postNumber} className="postImage" src={"http://localhost:3001/fuggosimageworld/"+postNumber+".png"} />
            </h0>
            {/*<div href={"/post/" + postNumber}>*/}
            <div>

            <p className="postText" >{postBody}</p>
            </div>


            <div className="floatingReplies">{

                trimReplies().map((r) => {
                    return <a className="floatingReply" href={"/post/"+postNumber+"#reply"+r.postNumber}>{r.replyName + ": " + r.replyBody + " "}</a>
                })
            }
            </div>
                <a href={"/post/" + postNumber} className="postFooter"
                ><h5 className="replies">{postNumberReplies} replies <span className="replyNow">View Thread</span></h5></a></div>)}