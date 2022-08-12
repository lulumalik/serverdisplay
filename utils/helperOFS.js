import { legend } from './legend.js';
export const filterInitialBaru = (initialtime, ishour, withoutHour) => {
    if (withoutHour) {
        return `${initialtime.split("-")[0]}${initialtime.split("-")[1]}${initialtime.split("-")[2].split("T")[0]
            }${ishour ? "00" : initialtime.split("-")[2].split("T")[1].split(":")[0]}`;
    } else {
        return `${initialtime.split("-")[0]}${initialtime.split("-")[1]}${initialtime.split("-")[2].split("T")[0]
            }${ishour ? "00" : initialtime.split("-")[2].split("T")[1].split(":")[0]}${ishour ? "00" : initialtime.split("-")[2].split("T")[1].split(":")[1]
            }`;
    }
};


export const HelperNearValue = (goal, variable) => {
    if (variable) {
        var precount = legend[variable].color
        var counts = []
        precount.forEach(function (item) {
            counts.push(item[0])
        })
        var closest = counts.reduce(function (prev, curr) {
            return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev
        })
        return { value: goal, rgb: legend[variable].color[counts.indexOf(closest)] }
    }
}