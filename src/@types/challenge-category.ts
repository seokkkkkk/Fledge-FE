import { Category } from "./sponsor-category";

export const challengeType: Category[] = [
    { id: "LIFE", label: "생활" },
    { id: "MIND_CONTROL", label: "마인드컨트롤" },
    { id: "SELF_DEVELOPMENT", label: "자기계발" },
    { id: "FINANCIAL_MANAGEMENT", label: "재정관리" },
    { id: "CERTIFICATION", label: "자격증" },
    { id: "EXERCISE", label: "운동" },
];

export const getOrdinalText = (index: number) => {
    const ordinals = [
        "첫 번째",
        "두 번째",
        "세 번째",
        "네 번째",
        "다섯 번째",
        "여섯 번째",
        "일곱 번째",
        "여덟 번째",
        "아홉 번째",
        "열 번째",
        "열한 번째",
        "열두 번째",
        "열세 번째",
        "열네 번째",
        "열다섯 번째",
        "열여섯 번째",
        "열일곱 번째",
        "열여덟 번째",
        "열아홉 번째",
        "스무 번째",
        "스물한 번째",
        "스물두 번째",
        "스물세 번째",
        "스물네 번째",
        "스물다섯 번째",
        "스물여섯 번째",
        "스물일곱 번째",
        "스물여덟 번째",
        "스물아홉 번째",
        "서른 번째",
    ];
    return ordinals[index] || `${index + 1}번째`;
};
