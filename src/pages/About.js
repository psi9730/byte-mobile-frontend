import React, { useState, useEffect, useCallback, useContext } from "react";
import styled, { css } from "styled-components";
import { Box, Text } from "/components/Common";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Select, Rank } from "/components/Input";
import { postSurvey } from "../services/About";

import { Button } from "/components/Button";
const Container = styled(Box)`
    width: 100%;
`;

const ContentContainer = styled(Box)`
    width: 100%;
    padding: 28px;
`;

const Title = styled(Box)`
    line-height: 32px;
`;

const Desc = styled(Box)`
    font-size: 12px;
    line-height: 22px;
`;

const SurveyContainer = styled(Box)`
    margin: 13px;
    border-radius: 13px;
    border: 1px solid #000000;
    background-color: #ffffff;
    box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.32);
    padding: 56px 19.5px;
    display: flex;
    flex-direction: column;
`;

const RankContainer = styled(Box)`
    width: 100%;
`;
const PhoneContainer = styled(Box)`
    width: 100%;
`;
const PhoneInputContainer = styled(Box)`
    width: 100%;
    display: flex;
    flex-direction: row;
`;
const Divider = styled("hr")`
    margin-left: 30%;
`;

const FeedbackContainer = styled(Box)`
    width: 100%;
`;

const ButtonText = styled(Text)`
    letter-spacing: 0.4rem;
`;

const StyledButton = styled(Button)`
    transition: border 500ms ease-out;
    transition: color 500ms ease-out;

    &:hover,
    &:active {
        border-color: ${(props) => props.theme.colors.purple} !important;
    }
    &:hover ${ButtonText}, &:active ${ButtonText} {
        color: ${(props) => props.theme.colors.purple} !important;
    }
`;
const defaultValues = {
    phone: "",
    phone_front: "010",
    rank: "",
    note: "",
};

const About = () => {
    const { handleSubmit, register, setValue, errors, control } = useForm({
        defaultValues,
    });
    useEffect(() => {
        register({ name: "rank" });
    }, [register]);

    const onSubmit = async (data) => {
        try {
            const fetchData = await postSurvey({ data }).then(
                (res) => res.data
            );
            alert(
                "설문조사에 응해주셔서 감사합니다! 더나은 바이트가 되도록 노력하겠습니다"
            );
        } catch (e) {
            alert("잠시후 다시 시도해주시면 감사하겠습니다!");
        }
    };

    const handleRankChange = (rank) => {
        setValue("rank", rank);
    };

    return (
        <Container pt={["40px", "60px"]} backgroundColor="white">
            <ContentContainer>
                <Text pb={90} fontWeight="900" color="black" textStyle="h3">
                    BYTE,
                    <br />
                    MZ 리더를 위한
                    <br />
                    뉴스 큐레이션
                </Text>
                <Divider color="black" />
                <Desc pb={47}>
                    <Text
                        pt={30}
                        textStyle="h5"
                        color="black"
                        textAlign="right"
                        lineHeight="1.8rem"
                    >
                        빠르게 변화하는 세상에서
                        <br />
                        MZ 유저들이
                        <br />
                        '알고 싶어하는', '알아야만 하는'
                        <br />
                        지식을 전달합니다
                    </Text>
                    <br />
                </Desc>
                <Desc pb={47}>
                    <Text
                        textAlign="center"
                        color="black"
                        fontWeight="900"
                        textStyle="h2"
                    >
                        TECHONOLGY
                        <br />
                        BUSINESS
                    </Text>
                    <Text
                        textAlign="center"
                        pt={47}
                        color="black"
                        textStyle="h5"
                    >
                        테크/비즈니스를 이해하는
                        <br />
                        새로운 관점을 만들어갑니다
                    </Text>
                </Desc>
            </ContentContainer>
            <SurveyContainer>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <PhoneContainer>
                        <Text textStyle="p6" mb={2} color="#000000">
                            8월 중에 앱 출시를 기획하고 있습니다. 전화번호를
                            남겨주시면 앱 출시 알림을 보내드려요.
                        </Text>
                        <PhoneInputContainer>
                            <Box flex="0 0 auto">
                                <Select
                                    name="phone_front"
                                    datas={[
                                        { key: "010", value: "010" },
                                        { key: "016", value: "016" },
                                        { key: "011", value: "011" },
                                    ]}
                                    control={control}
                                ></Select>
                            </Box>
                            <Box ml={16} flex="1 0 auto">
                                <TextInput
                                    inputRef={register({
                                        pattern: {
                                            value: /^\d+$/,
                                            message: "invalid phone number",
                                        },
                                    })}
                                    name="phone"
                                    id="standard-basic"
                                    placeholder="휴대전화번호 '-'을 제외하고 입력"
                                />
                            </Box>
                        </PhoneInputContainer>
                        {errors.phone && errors.phone.message}
                    </PhoneContainer>
                    <RankContainer mt={50}>
                        <Text textStyle="p6" mb={2} color="black">
                            바이트 서비스가 어떠셨나요?
                            <br />
                            평점을 남겨주세요!
                        </Text>
                        <Rank
                            onChange={handleRankChange}
                            Width={400}
                            name="rank"
                        />
                        {errors.rank && errors.rank.message}
                    </RankContainer>
                    <FeedbackContainer mt={50} mb={50}>
                        <Text color="black" textStyle="p6" mb={2}>
                            바이트 서비스에 대한 아이디어와 피드백을 남겨주세요!
                            <br />
                            여러분의 의견이 모여 좀더 나은 바이트가
                            만들어집니다.
                        </Text>
                        <TextInput
                            inputRef={register}
                            name="note"
                            id="standard-basic"
                            placeholder="이런 점은 고쳐주세요. 이런 점은 좋았어요."
                        />
                        {errors.feedback && errors.feedback.message}
                    </FeedbackContainer>

                    <StyledButton
                        width="100%"
                        borderRadius="8px"
                        border="1.5px solid rgb(0,0,0)"
                        backgroundColor="rgb(255,255,255)"
                        height="52px"
                        justifyContent="center"
                        type="submit"
                    >
                        <ButtonText>SUBMIT</ButtonText>
                    </StyledButton>
                </form>
            </SurveyContainer>
        </Container>
    );
};

export default About;
