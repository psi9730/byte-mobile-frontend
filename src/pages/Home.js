import React, {
    useState,
    useEffect,
    useCallback,
    useContext,
    useRef,
} from "react";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { Box } from "components/Common";
import { Toast } from "/components/Toast";
import { Deck } from "/containers/Home/containers";
import useIntersectionObserver from "hooks/useIntersectionObserver";
import useLocalStorage from "hooks/useLocalStorage";
import { RestAPIContext } from "stores";
import { getArticles } from "../services/Article";
const Container = styled(Box)`
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    overscroll-behavior: contain;
`;
const DeckContainer = styled(Box)`
    /* margin: 0 auto; */
    max-width: ${(props) => props.theme.breakpoints[2]};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;
const DeckInnerContainer = styled(Box)`
    /* margin: 0 auto; */
    ${(props) => css`
        @media ${props.theme.device.mobileS} {
            width: calc(100% - 70px);
        }
        @media ${props.theme.device.mobileL} {
            width: calc(100% - 100px);
        }
        @media ${props.theme.device.tablet} {
            width: calc(100% - 350px);
        }
    `}

    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
`;

const Home = () => {
    const history = useHistory();

    let RestAPI = useContext(RestAPIContext);
    const onClickToast = () => {
        history.push("/about");
    };
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [datas, setDatas] = useState([]);
    const [deckIndex, setDeckIndex] = useState(0);
    const [currentDatas, setCurrentDatas] = useState([]);
    const [likes, setLikes] = useLocalStorage("likes", []);

    const offset = useRef(0);
    const rootRef = useRef(null);
    const targetRef = useRef(null);

    const limit = 3;
    useEffect(() => {
        if (offset.current + limit - deckIndex < limit / 2) {
            loadMoreData();
        }
    }, [deckIndex]);
    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const fetchData = await getArticles({
                pagination: {
                    offset: offset.current,
                    limit: limit,
                },
                sort: { field: "created_at", order: "desc" },
            });
            console.log(fetchData);
            setCurrentDatas(fetchData);
            return fetchData;
        } catch (e) {
            setError(e);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }, [RestAPI]);
    const loadMoreData = useCallback(async () => {
        if (datas.length > 0) {
            offset.current = offset.current + limit;
            const data = await loadData({
                limit: limit,
            });
            data.length > 0 && setDatas([...datas, ...data]);
        }
    }, [datas, loadData]);

    useIntersectionObserver({
        root: rootRef.current,
        target: targetRef.current,
        onIntersect: ([{ isIntersecting }]) => {
            if (isIntersecting && !!offset.current && currentDatas.length > 0) {
                loadMoreData();
            }
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            const result = await loadData();
            result && result.length > 0 && setDatas(result);
        };
        fetchData();
    }, [loadData]);

    return datas.length > 0 ? (
        <Container pt={["40px", "60px"]}>
            <DeckContainer width="100%" height="100%" mt={["32px", "48px"]}>
                <DeckInnerContainer>
                    <Deck
                        likes={likes}
                        setLikes={setLikes}
                        datas={datas}
                        deckIndex={deckIndex}
                        setDeckIndex={setDeckIndex}
                    />
                </DeckInnerContainer>
            </DeckContainer>
            <Toast
                onClick={() => onClickToast()}
                data={{ image_url: "toast.png" }}
                width={["45px", "45px", "80px"]}
                height={["45px", "45px", "80px"]}
                boxShadow="5px 4px 3px 0px rgba(88, 88, 88, 0.425)"
            ></Toast>
        </Container>
    ) : null;
};

export default Home;
