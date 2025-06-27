import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "./ui/resizable";
import ChatList from "./common/chat-list";
import UserList from "./common/user-list";
import { MobileViewPropTypes } from "./mobile-view";

interface DesktopViewPropTypes extends MobileViewPropTypes {
    dummy?: string;
}

const DesktopView: React.FC<DesktopViewPropTypes> = ({
    userList,
    activeUser,
    setActiveUserHandler,
    setSearchUserHandler,
}) => {
    return (
        <div className="h-[calc(100vh-3.5rem)] sm:flex hidden w-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="min-h-[calc(100vh-3.25rem)] h-full overflow-y-auto"
            >
                <ResizablePanel defaultSize={25} minSize={15} maxSize={50}>
                    <UserList
                        userList={userList}
                        activeUser={activeUser}
                        setActiveUserHandler={setActiveUserHandler}
                        setSearchUserHandler={setSearchUserHandler}
                    />
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={75} className="flex flex-col">
                    {activeUser && (
                        <>
                            <div className="capitalize p-4 border-b">
                                {activeUser?.name}
                            </div>
                            <ChatList activeUser={activeUser} />
                        </>
                    )}
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    );
};

export default DesktopView;
