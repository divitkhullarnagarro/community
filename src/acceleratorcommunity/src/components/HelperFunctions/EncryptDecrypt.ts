const crypto = require('crypto');
import { Key, Algorithm } from '../../assets/helpers/constants';
const iv = crypto.randomBytes(16);

export function encryptString(input: string): string {
    const cipher = crypto.createCipheriv(Algorithm, Buffer.from(Key), iv);
    let encrypted = cipher.update(input, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ':' + encrypted;
}

export function decryptString(input: string): string {
    const [ivString, encryptedString] = input.split(':');
    const decipher = crypto.createDecipheriv(Algorithm, Buffer.from(Key), Buffer.from(ivString, 'hex'));
    let decrypted = decipher.update(encryptedString, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}