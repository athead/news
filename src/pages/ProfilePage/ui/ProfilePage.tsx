import { EditableProfileCard } from 'features/editableProfileCard';
import { classNames } from 'shared/lib/classNames/classNames';
import { VStack } from 'shared/ui/Stack/VStack/VStack';
import { Page } from 'widgets/Page/ui/Page';
import { useParams } from 'react-router-dom';
import cls from './ProfilePage.module.scss';

interface ProfilePageProps {
    className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
    const { id } = useParams<{ id: string }>();

    return (
        <Page className={classNames(cls.ProfilePage, {}, [className])}>
            <VStack gap="16" max>
                <EditableProfileCard id={id} />
            </VStack>
        </Page>
    );
};

export default ProfilePage;
