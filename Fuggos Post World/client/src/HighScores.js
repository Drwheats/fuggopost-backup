import {useEffect, useState} from "react";
import PostMap from "./PostMap";

export default function HighScores({contentPage}) {
    const [data, setData] = useState(true);
    const [allPosts, setAllPosts] = useState([]);
    const [nameToSubmit, setNameToSubmit] = useState('anonymous');
    const [topic, setTopic] = useState('No Topic');
    const [postBody, setPostBody] = useState('No Text');
    const [searchPoster, setSearchPoster] = useState("");
    const [searchTopic, setSearchTopic] = useState("");
    const [searchContent, setSearchContent] = useState("");
    const [postPage, setPostPage] = useState(contentPage);
    const [renderedPosts, setRenderedPosts] = useState([]);
    const [file, setFile] = useState()
    // Here, we get the list of posts from the server based on what page the user is on.
    useEffect(() => {
            if (data) {

                let json_body = JSON.stringify(
                    { postPage })
                const scoreJSON = {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: json_body
                }
                fetch("https://vercel.com/drwheats/fuggopost-server/postNumber", scoreJSON)
                .then(res => res.json())
                .then(
                    (result) => {
                        // console.log('successfully fetched data.')
                        let headerPost = {postBody: "Welcome to /b/! This forum has no topic. Post away! ", postName: "Fuggo", postTopic: "/b/", postNumber: 1, postVisibility: true, postReplies: [{postBody: "Hello"}], timePosted: "2021"}
                        result.unshift(headerPost);
                        console.log(result)
                        setAllPosts(result);
                        setData(false);
                        let tempPosts = allPosts.slice(postPage*10, postPage *10 +9)
                        setRenderedPosts(tempPosts);

                    }
                )}

    }, [data, allPosts])
    const changeInputNameValue = (event) => {
        setNameToSubmit(event.target.value);
    }
    const changeInputTopicValue = (event) => {
        setTopic(event.target.value);
    }
    const changeInputPostBody = (event) => {
        setPostBody(event.target.value);
    }
    const changeSearchPoster = (event) => {
        setSearchPoster(event.target.value);
        let searchPosterVar = event.target.value;
        if (searchPosterVar !== "") {
            for (let i = 0; i < allPosts.length; i++) {
                if (!allPosts[i].postName.toLowerCase().includes(searchPosterVar.toLowerCase())) {
                    allPosts[i].postVisibility = false;
                }
            }
        }

        else {
            for (let i = 0; i < allPosts.length; i++)
            {allPosts[i].postVisibility = true}
        }

    }
    const changeSearchTopic = (event) => {
        setSearchTopic(event.target.value);
        let searchTopicVar = event.target.value;
        if (searchTopicVar !== "") {
            for (let i = 0; i < allPosts.length; i++) {
                if (!allPosts[i].postTopic.toLowerCase().includes(searchTopicVar.toLowerCase())) {
                    allPosts[i].postVisibility = false;
                }
            }
        }

        else {
            for (let i = 0; i < allPosts.length; i++)
            {allPosts[i].postVisibility = true}
        }
    }
    const changeSearchContent = (event) => {
        setSearchContent(event.target.value);
        let searchContentVar = event.target.value;
        if (searchContentVar !== "") {
            for (let i = 0; i < allPosts.length; i++) {
                if (!allPosts[i].postBody.toLowerCase().includes(searchContentVar.toLowerCase())) {
                    allPosts[i].postVisibility = false;
                }
            }
        }

        else {
            for (let i = 0; i < allPosts.length; i++)
            {allPosts[i].postVisibility = true}
        }

    }
    function submitScore() {
        setData(false);
        let json_body = JSON.stringify(
            { postName: nameToSubmit, postTopic: topic, postBody: postBody, postVisibility: true})
        const scoreJSON = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: json_body
        }
        fetch("https://vercel.com/drwheats/fuggopost-server/submit", scoreJSON)
            .then(response => response.json());
        setData(true);

        setData(true);
    }
    function clearFilters() {
        let tempPosts = allPosts;
        setAllPosts(tempPosts);
        for (let i = 0; i < allPosts.length; i++) {
                allPosts[i].postVisibility = true;
            }
        setSearchPoster("");
        document.getElementById("searchBarPoster").value = "";
        document.getElementById("searchBarTopic").value = "";
        document.getElementById("searchBarContent").value = "";

        let elems = document.querySelectorAll("[id^='reply']")
        for (let i = 0; i < elems.length; i++) {
            elems[i].style.display = "block";
        }
        let lements = document.getElementsByClassName("plusGuy");
        while(lements[0]) {
            lements[0].parentNode.removeChild(lements[0]);
        }
        }

    function pageBack() {
        if (postPage > 0) {
            let postChange = postPage - 1;
            setPostPage(postChange);
            setRenderedPosts(allPosts.slice(postPage*10, postPage *10 +9))
            console.log(postPage)
            console.log(renderedPosts)

        }
    }
    function pageForward() {
        let postChange = postPage + 1;

        setPostPage(postChange);
        setRenderedPosts(allPosts.slice(postPage*10, postPage *10 +9))
        console.log(postPage)
        console.log(renderedPosts)

    }

    function showSearch() {
        document.getElementById("searchBar").style.display = "inline-block"
        document.getElementById("searchButtonHolder").style.display = "none"

    }

    function hideSearch() {
        document.getElementById("searchBar").style.display = "none"
        document.getElementById("searchButtonHolder").style.display = "inline-block"

    }


    function showPost() {
        // document.getElementById("submissionForm").style.position = "relative"
        document.getElementById("submissionForm").style.display = 'inline-block';


        document.getElementById("postButtonHolder").style.display = "none"

    }
    function hidePost() {
        // document.getElementById("submissionForm").style.position = "relative"
        document.getElementById("submissionForm").style.display = 'none';


        document.getElementById("postButtonHolder").style.display = "inline-block"

    }



    return (
        <div className="mainPostPage">
            <div className="toolContainer">
                <div className="searchButtonHolder" id="searchButtonHolder"
                > <button onClick={showSearch}>SEARCH</button></div>
                <div className="searchBar" id="searchBar">
                <h3>Find Posts</h3>
                <div>
                    <label>Name:   </label><input type="text" className="searchBarPoster" id="searchBarPoster" onChange={changeSearchPoster}/>
                </div>
                <div>
                    <label>Topic:   </label><input type="text" className="searchBarTopic" id="searchBarTopic" onChange={changeSearchTopic}/>
                </div>
                <div>
                    <label>Content: </label><input type="text" className="searchBarContent" id="searchBarContent" onChange={changeSearchContent}/>
                </div>
                <button className="clearButton" onClick={clearFilters}>CLEAR ALL FILTERS</button>
                    <button className="hideSearch" onClick={hideSearch}>HIDE</button>

                </div>

                <div className="postButtonHolder" id="postButtonHolder"
                    > <button onClick={showPost}>POST</button></div>

                <div className="submissionForm" id="submissionForm">

                    <label>Name</label><input onChange={changeInputNameValue} placeholder="Anonymous" type="text" className="nameTextSubmit"/>
                    <label>Topic</label><input placeholder="Topic" type="text" onChange={changeInputTopicValue} className="topicTextSubmit"/><button onClick={hidePost}>Hide</button>
                    <br/>
                    <textarea placeholder="Post" onChange={changeInputPostBody} className="mainTextSubmit"/>
                    <span className="fileUploadHolder">
                                          <input
                                              filename={file}
                                              onChange={e => setFile(e.target.files[0])}
                                              type="file"
                                              accept="image/*"
                                          ></input>
                    </span>

                    <br/>
                    <button onClick={submitScore}>SUBMIT</button>
                </div>
            </div>
    <div className="leaderboard" id="leaderboard">
         <div className='posts' id='posts'><PostMap posters={allPosts.slice(postPage*10, postPage *10 +9)}  className="postMap"/>
         </div>
        </div>
    <div className="footer" id="footer"> <button onClick={pageBack} className="backwardButton">BACK</button> Now Browsing Page : {postPage + 1}<button onClick={pageForward} className="forwardButton">FORWARD</button></div>
        </div> )}