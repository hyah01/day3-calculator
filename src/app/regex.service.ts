export class RegexService {
    getAll(){
        return /[+\-*/]/;
    }

    endWithSubtract(){
        return /([*/+-/][-/])$/;
    }

    endWithAll(){
        return /[*/+-/]$/;
    }
}