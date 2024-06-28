import Papa from 'papaparse';
import { read, utils } from 'xlsx';

import { type Patient, parsePesel } from '@/common/models/patient';

export class ImportService {
    static async parseExcelFile(fileData: Uint8Array) {
        const workBook = read(fileData);
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];

        const rawSheetData = utils.sheet_to_json<string[]>(workSheet, {
            header: 1,
            rawNumbers: false
        });

        return this.parsePatientData(rawSheetData);
    }

    static async parseCsvFile(fileData: string) {
        let rawSheetData = Papa.parse<string[]>(fileData, {
            header: false,
            skipEmptyLines: true
        }).data;

        rawSheetData = rawSheetData.slice(1);
        return this.parsePatientData(rawSheetData);
    }

    private static parsePatientData(rawSheetData: string[][]): Patient[] {
        rawSheetData = rawSheetData
            .map(row => row.map(cell => cell.trim()))
            .filter(row => row.some(cell => cell))
            .filter(row => row.length > 0);

        function parsePatient(id: number, data: string[]): Patient | null {
            try {
                return {
                    id: id,
                    date: new Date(),
                    cardNumber: data[0],
                    name: data[1],
                    pesel: parsePesel(data[2]),
                    assistants: [data[5]],
                    consultants: [data[6]],
                    doctor: data[7]
                };
            } catch (e) {
                console.error(`Error parsing patient data: ${data}`);
                return null;
            }
        }

        return rawSheetData
            .slice(1)
            .map((row, index) => parsePatient(index, row))
            .filter(patient => patient !== null)
            .filter(patient => patient?.cardNumber)
            .map(patient => patient as Patient);
    }
}
