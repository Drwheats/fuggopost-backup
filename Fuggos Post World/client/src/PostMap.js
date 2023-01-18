import Post from "./Post";


export default function PostMap({posters}, clicks) {
    if (posters.postName === '') {
        posters.postName = "anonymous";
    }

    console.log(posters)
    if (posters.length === 0){

    }


    return (
        <div className="cards">

        {posters.map(s => {
                if (s.timePosted === "2004") {
                    return <Post key={s.postNumber} postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility} postNumberReplies={s.postReplies.length} timePosted={s.timePosted} replies={s.postReplies}/>
                }
                if (s.postVisibility) {
                    return <Post key={s.postNumber} postName={s.postName} postTopic={s.postTopic} postBody={s.postBody} postNumber={s.postNumber} postVisibility={s.postVisibility} postNumberReplies={s.postReplies.length} timePosted={s.timePosted} replies={s.postReplies}/>
                }

        })}
        </div>

    )
}