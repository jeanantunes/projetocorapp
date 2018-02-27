import getAge from 'get-age'
import { dateUnformat } from '../../../../helpers'

export default function (fieldValue) {
    return getAge(dateUnformat(fieldValue)) >= 18
}
