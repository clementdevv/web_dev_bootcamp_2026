// Prompt user for day of the week
let dayOfWeek = prompt("Please provide the day of the week:");
        
        // Convert to lowercase to avoid misrepresentations
        if (dayOfWeek !== null && dayOfWeek !== "") {
            dayOfWeek = dayOfWeek.toLowerCase();
            
            // Use switch statement to validate and display
            switch(dayOfWeek) {
                case "monday":
                case "tuesday":
                case "wednesday":
                case "thursday":
                case "friday":
                case "saturday":
                case "sunday":
                    console.log(`today is ${dayOfWeek}`);
                    break;
                default:
                    console.log(`"${dayOfWeek}" is not a valid day of the week`);
            }
        } else {
            console.log("No day was provided.");
        }