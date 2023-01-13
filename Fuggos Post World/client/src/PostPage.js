import {useEffect} from "react";
import {useState} from "react";
import EnemyPost from "./EnemyPost";
import {$} from "jquery";

export default function PostPage() {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({postName: "", postTopic: "", postBody: "", postNumber: 0, postVisibility: true, postReplies: [], numberInlineReplies: [], timePosted: ""});
    // const [inlineReplies, setInlineReplies] = useState();
    const [clientReplyBody, setClientReplyBody] = useState("no text");
    const [clientReplyName, setClientReplyName] = useState("anonymous");

    let pageLoc = window.location.pathname.split('/')[2];
    let json_body = JSON.stringify({ pageLoc })
    const scoreJSON = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: json_body
    }

    // ALl things REPLIES go here:
    const changeInputNameValue = (event) => {
        setClientReplyName(event.target.value);
    }
    const changeInputPostBody = (event) => {
        setClientReplyBody(event.target.value);
    }
    function submitReply() {
        if (clientReplyName === "") {
            setClientReplyName("anonymous");
        }
        let json_body = JSON.stringify(
            {pageLoc: pageLoc, replyName: clientReplyName, replyBody: clientReplyBody})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        fetch("https://vercel.com/drwheats/fuggopost-server/submitReply", scoreJSON)
            .then(response => response.json());
        setIsLoading(true);
    }

    // Fetching the data JSON variable from the server.
    useEffect(() => {
        if (isLoading) {
            fetch("https://vercel.com/drwheats/fuggopost-server/pageInfo", scoreJSON)
                .then(response => response.json())
                .then((
                    result) => {
                    setData(result);
                    setIsLoading(false);

                })
        }
        mapReplies();
        }
    )
    window.onload = mapReplies();

    function mapReplies() {
        data.numberInlineReplies = []

        data.postReplies.map(s=> {
            let holder = [];
            let str = "";
            s.nestedReplies = []
            let len = s.replyBody.length
            // this finds all the replies inside of data.postReplies[i].replyBody
            for (let i = 0; i < len; i++) {
                str = "";
                if (s.replyBody[i] === '@') {
                // if (s.replyBody[i]) {
                    for (let j= i +1; j < len; j++) {
                        if (/^\d/.test(s.replyBody[j])) {
                            str += s.replyBody[j];
                            continue;}
                        else
                        {if (str === "") {
                            break;
                        }}

                        if (str !== "") {
                            holder.push(str);
                            str = "";
                            break;
                           }

                    }
                } if (str !== "")
                {   str = Number(str)
                    holder.push(str)}
            }
                for (let i = 0; i < holder.length; i++) {
                    if (Number(holder[i]) === Number(data.postNumber)){
                        // console.log(s.postNumber)
                        data.numberInlineReplies.push(s.postNumber)
                    }

                }

            for (let i =0; i < data.postReplies.length; i++){
                if (data.postReplies[i].nestedReplies)
                for (let j=0; j<holder.length; j++) {
                    if (Number(holder[j]) === Number(data.postReplies[i].postNumber) && !data.postReplies[i].nestedReplies.includes(s.postNumber)) {
                        data.postReplies[i].nestedReplies.push(s.postNumber)
                    }

                }
            }
            return 0;
        }
        )
    }
    function insertInlineReplies(){
        for (let k =0; k< data.postReplies.length; k++){

            let greenStr = ""
            let greenText = document.createElement('p');

            let createdElement = document.createElement('span');
            let holderElement = document.createElement('pre');
            let whiteText = document.createElement('pre');
            let links = document.createElement('a');
            let enemyPostBody = data.postReplies[k].replyBody + " \n";
            let postStr = "";
            for (let i = 0; i < enemyPostBody.length; i++) {
                let greenText = document.createElement('p')

                if (enemyPostBody[i] === '>') {
                    let greenStr = "";
                    for (let j=i; j < enemyPostBody.length; j++) {
                        if (enemyPostBody[j] !== '\n'){
                            console.log(enemyPostBody.length)
                            greenStr += enemyPostBody[j];
                            console.log(greenStr)
                        }
                        // The below code doesn't work. It duplicates shit and adds shit to whitespace, it does not add inline @s to greentext.
                        // if (enemyPostBody[j] === '@') {
                        //     postStr += enemyPostBody[j];
                        //     for (let k=j+1; k < enemyPostBody.length; k++) {
                        //         if (/^\d/.test(enemyPostBody[k])) {
                        //             postStr += enemyPostBody[k];
                        //         }
                        //         else if (postStr === '@'){
                        //             break;
                        //         }
                        //         else {
                        //             // console.log("we are about to append " + postStr)
                        //             let postLink = document.createElement('a')
                        //             postLink.className = "inlineReply";
                        //             postLink.textValue = postStr;
                        //             postLink.content = postStr;
                        //
                        //             postLink.id = "inlineReply"+data.postReplies[k].postNumber;
                        //
                        //             postLink.innerHTML = postStr;
                        //             postLink.setAttribute('href', '#reply'+postStr.slice(1));
                        //             try{
                        //                 postLink.setAttribute('textfloat', document.getElementById("reply"+postStr.slice(1)).innerText);
                        //             }
                        //             catch (e){}
                        //             greenText.append(postLink)
                        //             postLink = ""
                        //             i = j;
                        //             break;
                        //         }
                        //
                        //     }
                        // }

                        else {
                            // console.log("we are about to append " + postStr)
                            console.log(greenStr + " logged!")
                            greenText.setAttribute("className", "greenText");
                            greenText.className = "greenText";
                            greenText.textValue = greenStr;
                            greenText.innerHTML = greenStr;
                            whiteText.insertAdjacentElement("beforeend", greenText);
                            greenStr = ""
                            greenText = document.createElement('p');
                            i = j;
                            break;
                        }



                    }

                }

                if (enemyPostBody[i] === '@') {
                    postStr += enemyPostBody[i];
                    for (let j=i+1; j < enemyPostBody.length; j++) {
                        if (/^\d/.test(enemyPostBody[j])) {
                            postStr += enemyPostBody[j];
                        }
                        else if (postStr === '@'){
                            break;
                        }
                        else {
                            // console.log("we are about to append " + postStr)
                            let postLink = document.createElement('a')
                            postLink.className = "inlineReply";
                            postLink.textValue = postStr;
                            postLink.content = postStr;

                            postLink.id = "inlineReply"+data.postReplies[k].postNumber;

                            postLink.innerHTML = postStr;
                            postLink.setAttribute('href', '#reply'+postStr.slice(1));
                            try{
                                postLink.setAttribute('textfloat', document.getElementById("reply"+postStr.slice(1)).innerText);
                            }
                            catch (e){}
                            whiteText.append(postLink)
                            postStr = "";
                            postLink = ""
                            i = j -1;
                            break;
                        }

                    }
                }

                else {whiteText.append(enemyPostBody[i])}

            }
            console.log(greenStr)
            greenText.append(greenStr)
            whiteText.append(greenText)
            console.log(whiteText.innerHTML)
            try {
                document.getElementById("enemyPostText"+data.postReplies[k].postNumber).innerHTML = '';
                createdElement.append(whiteText)
                createdElement.append(links)
                document.getElementById("enemyPostText"+data.postReplies[k].postNumber).append(createdElement)
            }

            catch (e){}
        }
    }

    function insertTopReplies(){
        let classes = document.getElementsByClassName("inlineReply2");
        // console.log("starting : ")
        for (let i=0; i<classes.length; i++){
            // console.log(classes[i])
            // console.log(data.postReplies)
            classes[i].setAttribute("textfloat", document.getElementById("reply"+classes[i].innerText.slice(2)).innerText)
        }
        classes = document.getElementsByClassName("inlineReply3");
        for (let i=classes.length; i>0; i--){
            // console.log(classes[i])
            try {
                classes[i].setAttribute("textfloat", document.getElementById("reply"+classes[i].innerText.slice(2)).innerText)
            }
            catch (e) {

            }
        }


    }

    insertInlineReplies();
    insertTopReplies();

    function formatDate() {
        let timePosted = Date(data.timePosted);
        timePosted = timePosted.split(' ').slice(0, 5).join(' ');
        return timePosted;
    }
    formatDate();

    return (

        <div className="postPage" >
            <div className="originalPoster" id={"reply"+data.postNumber}><ul className="inlineReply">{data.numberInlineReplies.map((r) => {
                let lol = "hey"
                try{lol = document.getElementById("reply"+r).innerText}
                catch (e){};
                return <a className="inlineReply3" href={"/post/" + data.postNumber + "#reply"+r} textfloat={lol} key={r}>>>{r}  </a>
            })} </ul>
                <h2 className="postTopic">{data.postTopic}</h2>
                <div className="originalPosterHeader" id="originalPosterHeader"><h3 className="OriginalPosterNumber">#{data.postNumber}</h3><h3 className="originalPosterName">{data.postName}</h3>
                    <h3 className="timeStampOP">{formatDate()}</h3>
                </div>
            <p className="postText">{data.postBody}</p>
            </div>
        <div className="enemyPosters">
            {data.postReplies.map(s => {
                    return <EnemyPost key={s.postNumber} enemyPostName={s.replyName} enemyPostBody={s.replyBody} enemyPostNumber={s.postNumber} motherPost={data.postNumber} nestedReplies={s.nestedReplies} timePosted={s.postTime}/>
                })}
        </div>
            <div className="submissionFormReply">

            <div className="submissionForm2">
                <label>Name</label><input onChange={changeInputNameValue} type="text" className="nameTextSubmit"/>

                <br/>
                <textarea onChange={changeInputPostBody} className="mainTextSubmit"/>
                <br/>
                <button onClick={submitReply}>REPLY</button>
            </div>
            </div>

        </div> )}