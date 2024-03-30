export enum Sex {
    Male = 'M',
    Female = 'F'
}

export interface Pesel {
    string: string;
    sex: Sex;
    birthdate: Date;
    age: number;
}

export function parsePesel(peselString: string): Pesel {
    peselString = peselString.trim();

    if (peselString.length !== 11) {
        throw new Error('provided pesel is not 11 characters long');
    }

    if (!parseInt(peselString, 10)) {
        throw new Error('provided pesel is not a integer number');
    }

    let codifiedMonth = parseInt(peselString.slice(2, 4), 10);
    let century = 1900;
    if (codifiedMonth > 80) {
        codifiedMonth -= 80;
        century = 2300;
    } else if (codifiedMonth > 60) {
        codifiedMonth -= 60;
        century = 2200;
    } else if (codifiedMonth > 40) {
        codifiedMonth -= 40;
        century = 2100;
    } else if (codifiedMonth > 20) {
        codifiedMonth -= 20;
        century = 2000;
    }

    const year = parseInt(peselString.slice(0, 2), 10);
    const sex = parseInt(peselString.slice(-1), 10) % 2 === 0 ? Sex.Male : Sex.Female;

    const month = codifiedMonth % 20;
    const day = parseInt(peselString.slice(4, 6), 10);
    const birthdate = new Date(century + year, month - 1, day);

    const age = Math.floor(
        (new Date().getTime() - birthdate.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );
    return {
        string: peselString,
        sex: sex,
        birthdate: birthdate,
        age: age
    };
}

export interface Patient {
    id: number;
    cardNumber: string;
    name: string;
    pesel: Pesel;
}