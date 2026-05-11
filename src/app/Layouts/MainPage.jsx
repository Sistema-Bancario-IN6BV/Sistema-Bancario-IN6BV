import { MainContainer } from "../../shared/components/layouts/MainContainer";
import { Outlet } from "react-router-dom";

export const MainPage = () => {
    return (
        <MainContainer>
            <Outlet />
        </MainContainer>
    );
};
