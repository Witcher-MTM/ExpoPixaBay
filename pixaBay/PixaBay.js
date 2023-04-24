export default new class PixaBay {
    apiKey = "35716097-095157818fa3448d33960631a";
    async get_images() {
        var images
        await fetch(`https://pixabay.com/api/?key=${this.apiKey}&q=Ukraine`)
            .then(response => response.json())
            .then(data => images = data)
            .catch(error => console.error(error))   
        return images;
    }
}

