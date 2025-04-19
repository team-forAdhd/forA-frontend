import {
    NAVER_CLOUD_PLATFORM_OCR_SECRET,
    NAVER_CLOUD_PLATFORM_OCR_URL,
} from '@env';
import axios from 'axios';

const REQUEST_ID = 'hospitalReceiptValidation';
const filterNameList = ['병원', '정신건강', '의원', '소아청소년'];
export const receiptValidationCheck = async (
    base64EncodedImage: string,
    hospitalName: string,
) => {
    /* Definition of Constant Variable */
    /* Definition of Headers, Required Variable */
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'X-OCR-SECRET': NAVER_CLOUD_PLATFORM_OCR_SECRET,
        },
    };

    const { data } = await axios.post(
        NAVER_CLOUD_PLATFORM_OCR_URL,
        {
            version: 'V2',
            requestId: REQUEST_ID,
            timestamp: Date.now(),
            images: [
                {
                    format: 'jpg',
                    name: 'ocrImage',
                    data: base64EncodedImage,
                },
            ],
            enableTableDetection: false,
        },
        config,
    );
    if (
        data.images[0].inferResult === 'FAILURE' ||
        data.images[0].inferResult === 'ERROR'
    )
        throw new ValidationError(
            '이미지 확인이 제대로 되지 않았습니다. 다시 찍어주세요.',
        );

    const receiptData = data.images[0].receipt;
    if (!receiptData || !receiptData.result || !receiptData.result.storeInfo) {
        throw new ValidationError(
            '이미지 확인이 제대로 되지 않았습니다. 다시 찍어주세요.',
        );
    }
    let hospital = receiptData.result.storeInfo.name.formatted.value;
    hospital = filterNameList
        .reduce((name, suffix) => name.replace(suffix, ''), hospital)
        .trim();

    const hospitalDict = Array.from(hospital);
    let hit = 0;
    for (let i = 0; i < hospitalName.length; i++) {
        if (hospitalDict.includes(hospitalName[i])) hit++;
    }
    if ((hit / hospitalDict.length) * 100 < 60) {
        throw new ValidationError(
            '영수증 검증에 실패했습니다. 다시 찍어주세요.',
        );
    }

    const totalPrice = receiptData.result.totalPrice.price.formatted.value;
    if (!totalPrice || isNaN(+totalPrice)) {
        throw new ValidationError('영수증에서 총 금액을 확인할 수 없습니다.');
    }
    if (+totalPrice >= 1000) return +totalPrice;

    throw new ValidationError('영수증 검증에 실패했습니다. 다시 찍어주세요.');
};

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
