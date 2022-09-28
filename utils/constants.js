/**
 * This file is used to make string literals into constants
 */
module.exports = {
    releaseStatus : {
        released : "RELEASED",
        coming_soon : "COMING_SOON",
        blocked : "BLOCKED"
    },
    genre : {
        comedy : "COMEDY",
        romcom : "ROMCOM",
        drama : "DRAMA",
        scifi : "SCIFI",
        offbeat : "OFFBEAT"
    },
    showTypes : {
        morning : "MORNING",
        noon : "NOON",
        evening : "EVENING",
        night : "NIGHT"
    },
    userType : {
        admin : "ADMIN",
        customer : "CUSTOMER",
        theatreOwner : "THEATRE_OWNER"
    },
    userStatus : {
        pending : "PENDING",
        approved : "APPROVED",
        rejected : "REJECTED"
    },
    bookingStatus : {
        inprogress : "IN_PROGRESS",
        booked : "BOOKED",
        failed : "FAILED",
        cancelled : "CANCELLED"
    },
    paymentStatus : {
        failed : "FAILED",
        success : "SUCCESS"
    },
    ticketPrice : 150
}