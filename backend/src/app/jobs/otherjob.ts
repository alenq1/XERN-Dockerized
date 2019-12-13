import scraper from '../helpers/scraper'
import {Ijobs} from '../interfaces/jobs'


export const job: Ijobs ={
    name: 'scraper',
    action: scraper,
    options: {},
    queue: ''
}