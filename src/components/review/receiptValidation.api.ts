import {
    NAVER_CLOUD_PLATFORM_OCR_SECRET,
    NAVER_CLOUD_PLATFORM_OCR_URL,
} from '@env';
import axios from 'axios';

const REQUEST_ID = 'hospitalReceiptValidation';
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

    if (
        data.images[0].receipt.result.storeInfo.name === hospitalName &&
        +data.images[0].receipt.result.totalPrice.price.formatted >= 1000
    )
        return +data.images[0].receipt.result.totalPrice.price.formatted;

    throw new ValidationError('영수증 검증에 실패했습니다. 다시 찍어주세요.');
};

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}
