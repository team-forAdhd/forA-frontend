import React from 'react'
import Svg, { Defs, G, Path, Pattern, Rect, Use } from 'react-native-svg'

export const ArrowIcon = () => (
    <Svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M22.5 27L13.5 18L22.5 9"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
)

export const TitleTextIcon = () => (
    <Svg
        width="100"
        height="36"
        viewBox="0 0 100 36"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M5.12 21.28C3.96 21.24 2.92 21.12 2.24 20.72C0.92 19.96 0.32 18.48 0.32 16.36C0.32 13 2.16 12.12 5.16 11.8C5.16 11.28 5.2 10.8 5.24 10.28C5.28 9.44 5.32 8.6 5.4 7.76C5.72 3.44 8.92 -1.43051e-06 13.16 -1.43051e-06C19.4 -1.43051e-06 21.2 2.2 21.2 5.36C21.2 7.76 20.12 9.76 18.32 9.6C16.28 9.4 13.64 9.48 11.72 9.92C11.12 10.04 11.24 10.88 11.92 10.76C14.4 10.28 17.72 10.16 19.28 11.04C20.6 11.8 21.2 13.32 21.2 15.44C21.2 18.52 19.6 19.8 16.76 20C16.68 23.16 16.48 26.24 16.2 29.24C15.88 32.24 14.24 34.6 10.92 34.6C7.52 34.6 5.92 32.24 5.6 29.24C5.32 26.6 5.2 23.92 5.12 21.28ZM20.6341 22.68C20.6741 14.88 25.7941 9.32 33.6741 9.32C41.6341 9.32 45.4341 16.08 45.4341 22.68C45.3541 29.36 40.6741 35.28 33.5541 35.28C26.1141 35.28 20.6341 29.88 20.6341 22.68ZM31.8341 24.92C31.5141 25.52 32.6741 26.12 33.2341 25.36C34.3141 23.76 34.5941 21.6 34.6341 19.6C34.6741 18.68 33.3141 18.72 33.2741 19.4C33.1141 21.36 32.7941 23 31.8341 24.92ZM56.0841 10.24C54.7641 11.6 53.8441 13.44 53.6841 15.36C53.5641 16.32 54.4041 16.44 54.6041 15.6C55.6441 10.84 58.0841 9 61.7641 9.28C65.0841 9.52 66.2041 12.96 66.1641 15.2C66.1641 17.32 65.6841 21.04 61.8041 21.64C60.5241 21.84 59.0441 21.28 57.8041 20.28C57.2041 19.76 56.8841 20.28 56.8841 20.96C56.8041 23.84 56.6441 26.76 56.3641 29.6C56.0441 32.6 54.4041 34.96 51.0841 34.96C47.6841 34.96 46.0041 32.6 45.7641 29.6C45.3241 23.76 45.5241 17.96 45.6041 12.12C45.6441 10.8 46.3241 9.72 47.3641 9.56C48.2041 9.4 49.3641 9.32 50.6041 9.32C52.9241 9.32 55.3641 9.68 56.0841 10.24ZM84.6066 27.76C84.7666 30.92 83.6466 34.6 79.0066 34.6C75.9266 34.6 73.6866 32.64 73.4866 29.56C73.3266 25.64 73.2466 21.56 73.2466 17.48C73.2466 7.92 76.0866 0.399998 86.5666 0.399998C97.0866 0.399998 99.9666 7.92 99.9666 17.48C99.9666 21.56 99.8866 25.64 99.6866 29.56C99.5266 32.64 97.2466 34.6 94.1266 34.6C89.5666 34.6 88.3666 30.88 88.5266 27.76C86.8066 28.2 86.3666 28.2 84.6066 27.76ZM90.0066 16.84C88.4066 15.64 86.2866 15.36 84.2866 15.28C83.3666 15.24 83.3666 16.64 84.0466 16.72C86.0066 16.84 87.6466 17.2 89.5266 18.2C90.0866 18.52 90.7266 17.28 90.0066 16.84Z"
            fill="#52A55D"
        />
    </Svg>
)

export const CameraIcon = () => (
    <Svg
        width="19"
        height="19"
        viewBox="0 0 19 19"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M15.8332 12.2635C15.8332 13.5752 14.7698 14.6385 13.4582 14.6385H5.54152C4.22984 14.6385 3.16652 13.5752 3.16652 12.2635L3.1665 7.58551C3.1665 6.71106 3.87538 6.00218 4.74984 6.00218H5.77367C6.30307 6.00218 6.79743 5.7376 7.09109 5.29712L7.30252 4.97996C7.59618 4.53948 8.09054 4.2749 8.61994 4.2749H10.3797C10.9091 4.2749 11.4035 4.53948 11.6971 4.97996L11.9086 5.29712C12.2022 5.7376 12.6966 6.00218 13.226 6.00218H14.2498C15.1243 6.00218 15.8332 6.71106 15.8332 7.58551V12.2635Z"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M9.49983 12.3355C10.7718 12.3355 11.8029 11.3044 11.8029 10.0325C11.8029 8.76055 10.7718 7.72945 9.49983 7.72945C8.2279 7.72945 7.1968 8.76055 7.1968 10.0325C7.1968 11.3044 8.2279 12.3355 9.49983 12.3355Z"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const DefaultCameraIcon = () => (
    <Svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M29.1666 22.5909C29.1666 25.0072 27.2078 26.9659 24.7916 26.9659H10.2083C7.79203 26.9659 5.83328 25.0072 5.83327 22.5909L5.83325 13.9735C5.83325 12.3627 7.13908 11.0568 8.74992 11.0568H10.6359C11.6111 11.0568 12.5218 10.5694 13.0627 9.75803L13.4522 9.17379C13.9932 8.36238 14.9039 7.875 15.879 7.875H19.1208C20.096 7.875 21.0066 8.36238 21.5476 9.17379L21.9371 9.75803C22.478 10.5694 23.3887 11.0568 24.3639 11.0568H26.2499C27.8607 11.0568 29.1666 12.3627 29.1666 13.9735V22.5909Z"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M17.4999 22.7235C19.8429 22.7235 21.7423 20.8241 21.7423 18.4811C21.7423 16.138 19.8429 14.2386 17.4999 14.2386C15.1569 14.2386 13.2575 16.138 13.2575 18.4811C13.2575 20.8241 15.1569 22.7235 17.4999 22.7235Z"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const LeftArrowIcon = () => (
    <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
    >
        <Path
            d="M13.8542 9.47925L6.01882 17.3129C5.89519 17.4344 5.83337 17.5936 5.83337 17.7529M13.8542 25.5209L6.01882 18.1928C5.89519 18.0713 5.83337 17.9121 5.83337 17.7529M5.83337 17.7529H29.1667"
            stroke="#232323"
            stroke-width="2"
            stroke-linecap="round"
        />
    </Svg>
)

export const DeleteIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M12 4L4 12"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M4 4L12 12"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const CategoryIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M14 6.66667H2"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M14 4H2"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M14 9.33333H2"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M14 12H2"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const ViewIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M0.666687 8C0.666687 8 3.33335 2.66667 8.00002 2.66667C12.6667 2.66667 15.3334 8 15.3334 8C15.3334 8 12.6667 13.3333 8.00002 13.3333C3.33335 13.3333 0.666687 8 0.666687 8Z"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <Path
            d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const ThumbsUpIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M5.19863 7.11025C5.19863 7.11025 6.40435 3.7256 7.33877 3.17566C8.27319 2.62571 8.89614 3.48713 8.89614 4.11009C8.89614 4.73304 8.46876 6.67471 8.46876 6.67471L11.8835 6.24786C12.7474 6.13988 13.4677 6.90139 13.312 7.75791L12.5656 11.863C12.439 12.5596 11.7742 13.0238 11.0765 12.9027L5.19863 11.8821M5.19863 7.11025V11.8821M5.19863 7.11025H3.67944C3.41084 7.11025 3.15323 7.21695 2.9633 7.40689C2.77336 7.59682 2.66666 7.85443 2.66666 8.12303V10.8693C2.66666 11.1379 2.77336 11.3955 2.9633 11.5855C3.15323 11.7754 3.41084 11.8821 3.67944 11.8821H5.19863"
            stroke="#555555"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const LikedIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M12.5107 4.8225C12.25 4.56174 11.9406 4.35489 11.6 4.21377C11.2594 4.07264 10.8943 4 10.5256 4C10.157 4 9.79189 4.07264 9.4513 4.21377C9.1107 4.35489 8.80124 4.56174 8.54061 4.8225L8.20528 5.15783C8.09174 5.27137 7.90766 5.27137 7.79412 5.15783L7.45879 4.8225C6.93233 4.29604 6.21829 4.00027 5.47376 4.00027C4.72923 4.00027 4.01519 4.29604 3.48873 4.8225C2.96227 5.34896 2.6665 6.063 2.6665 6.80753C2.6665 7.55206 2.96227 8.2661 3.48873 8.79256L6.76621 12.07C7.44745 12.7513 8.55195 12.7513 9.23319 12.07L12.5107 8.79256C12.7714 8.53193 12.9783 8.22247 13.1194 7.88187C13.2605 7.54128 13.3332 7.17621 13.3332 6.80753C13.3332 6.43885 13.2605 6.07379 13.1194 5.73319C12.9783 5.39259 12.7714 5.08313 12.5107 4.8225Z"
            stroke="#232323"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const ClikedLikedIcon = () => (
    <Svg
        // xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
    >
        <Rect width="16" height="16" fill="white" />
        <Path
            d="M12.5107 4.8225C12.25 4.56174 11.9406 4.35489 11.6 4.21377C11.2594 4.07264 10.8943 4 10.5256 4C10.157 4 9.79189 4.07264 9.4513 4.21377C9.1107 4.35489 8.80124 4.56174 8.54061 4.8225L8.20528 5.15783C8.09174 5.27137 7.90766 5.27137 7.79412 5.15783L7.45879 4.8225C6.93233 4.29604 6.21829 4.00027 5.47376 4.00027C4.72923 4.00027 4.01519 4.29604 3.48873 4.8225C2.96227 5.34896 2.6665 6.063 2.6665 6.80753C2.6665 7.55206 2.96227 8.2661 3.48873 8.79256L6.76621 12.07C7.44745 12.7513 8.55195 12.7513 9.23319 12.07L12.5107 8.79256C12.7714 8.53193 12.9783 8.22247 13.1194 7.88187C13.2605 7.54128 13.3332 7.17621 13.3332 6.80753C13.3332 6.43885 13.2605 6.07379 13.1194 5.73319C12.9783 5.39259 12.7714 5.08313 12.5107 4.8225Z"
            fill="#52A55D"
            stroke="#52A55D"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const ScrapIcon = () => (
    <Svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M12.2317 12.6244C12.2317 13.1985 11.584 13.5338 11.1152 13.2023L8.59986 11.4238C8.11004 11.0774 7.45511 11.0774 6.9653 11.4238L4.44994 13.2023C3.98113 13.5338 3.3335 13.1985 3.3335 12.6244V4.79017C3.3335 3.61744 4.28419 2.66674 5.45693 2.66675L10.1082 2.66676C11.281 2.66677 12.2317 3.61746 12.2317 4.79019V12.6244Z"
            stroke="#232323"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const ShareIcon = () => (
    <Svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M4.6665 9.99992L4.66651 14.1666C4.66651 15.5473 5.78579 16.6666 7.16651 16.6666H12.8332C14.2139 16.6666 15.3332 15.5473 15.3332 14.1666V9.99992M12.6665 5.99992L9.99984 3.33325M9.99984 3.33325L7.33317 5.99992M9.99984 3.33325V11.9999"
            stroke="#232323"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const EditIcon = () => (
    <Svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M23.3798 6.82627C23.3798 6.82627 24.0683 6.26178 24.4796 6.09142C24.8909 5.92106 25.3317 5.83337 25.7769 5.83337C26.2221 5.83337 26.6629 5.92106 27.0742 6.09142C27.4854 6.26178 27.8591 6.51148 28.1739 6.82627C28.4887 7.14105 28.7384 7.51476 28.9088 7.92604C29.0791 8.33733 29.1668 8.77814 29.1668 9.22332C29.1668 9.66849 29.0791 10.1093 28.9088 10.5206C28.7384 10.9319 28.1739 11.6204 28.1739 11.6204C28.1739 11.6204 17.2844 25.6667 11.9938 27.8005C10.6883 28.327 8.92568 28.7983 7.55155 29.1262C6.52747 29.3705 5.62972 28.4727 5.87404 27.4487C6.20187 26.0745 6.6732 24.3119 7.19973 23.0064C9.33349 17.7158 23.3798 6.82627 23.3798 6.82627Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)

export const DeleteIcon2 = () => (
    <Svg
        width="35"
        height="35"
        viewBox="0 0 35 35"
        fill="none"
        // xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            d="M14.5829 16.7709L15.231 23.5764M20.4162 16.7709L19.768 23.5764M6.34326 11.5566H8.98469M8.98469 11.5566C15.8619 11.5566 28.6321 11.5566 28.6321 11.5566M8.98469 11.5566L9.92505 25.0949C10.0843 27.3879 11.9909 29.1667 14.2895 29.1667H20.7418C23.0271 29.1667 24.9274 27.4079 25.1038 25.1294L26.1546 11.5566C26.1546 11.5566 15.0022 11.5566 8.98469 11.5566ZM12.947 11.5566V8.75004C12.947 7.13921 14.2529 5.83337 15.8637 5.83337H19.2757C20.8865 5.83337 22.1923 7.13921 22.1923 8.75004V11.5566"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </Svg>
)
