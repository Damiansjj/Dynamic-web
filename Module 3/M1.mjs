const formatText = () => {
    let text = document.getElementById("inputText").value;
    
    let tweet = text.length > 280 ? text.slice(0, 277) + "..." : text;
    
    let post = text.length > 1000 ? text.slice(0, 997) + "..." : text;
    
    let combo = `Tweet: ${tweet}\nPost: ${post}`;

    document.getElementById("tweetOutput").innerText = tweet;
    document.getElementById("postOutput").innerText = post;
    document.getElementById("comboOutput").innerText = combo;
};
