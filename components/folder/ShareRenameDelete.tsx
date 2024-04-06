import DeleteButton from './DeleteButton';
import RenameButton from './RenameButton';
import ShareButton from './ShareButton';
import styles from './FolderLinkList.module.css';

function ShareRenameDelete({
  folderName,
  folderId,
}: {
  folderName: string;
  folderId: number;
}) {
  return (
    <div className={styles.shareRenameDelete}>
      <ShareButton folderName={folderName} folderId={folderId} />
      <RenameButton />
      <DeleteButton folderName={folderName} />
    </div>
  );
}
export default ShareRenameDelete;
