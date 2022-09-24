/**
 * This file will have the logic for validating while new movie creation
 */
const newMovieBody = async (req, res, next) => {
    try {
        //Check if movie name is provided or not
        if (!req.body.name) {
            return res.status(400).send({
                message: "Movie name is not provided"
            })
        }

        //Check if Movie description is provided or not
        if (!req.body.description) {
            return res.status(400).send({
                message: "Movie description is not provided"
            })
        }

        //Check if cast names are provided or not
        if (!req.body.casts) {
            return res.status(400).send({
                message: "cast names are not provided"
            })
        }

        //Check if trailerURL are provided or not
        if (!req.body.trailerURL) {
            return res.status(400).send({
                message: "TrailerURLs are not provided"
            })
        }

        //Check if posterURL are provided or not
        if (!req.body.posterURL) {
            return res.status(400).send({
                message: "Poster URLs are not provided"
            })
        }

        //Check if language provided or not
        if (!req.body.language) {
            return res.status(400).send({
                message: "Language is not provided"
            })
        }

        //Check if release status is provided or not
        if (!req.body.releaseStatus) {
            return res.status(400).send({
                message: "release status is not provided"
            })
        }

        next()
    }catch(err){
        console.log("Error while movie validation ", err.message);
        res.status(500).send({
            message : "Internal server Error"
        })
    }

}

const validateMovieRequestBody = {
    newMovieBody: newMovieBody
}

module.exports = validateMovieRequestBody