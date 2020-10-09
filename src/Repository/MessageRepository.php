<?php
namespace App\Repository;

use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method User|null find($id, $lockMode = null, $lockVersion = null)
 * @method User|null findOneBy(array $criteria, array $orderBy = null)
 * @method User[]    findAll()
 * @method User[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function findConversation ($fromUser, $toUser) {
        $entityManager = $this->getEntityManager();

        $query = $entityManager->createQuery(
            'SELECT m
            FROM App\Entity\Message m
            WHERE
                (m.fromUser = :fromUser AND m.toUser = :toUser)
                    OR  
                (m.fromUser = :toUser AND m.toUser = :fromUser)
            ORDER BY m.id DESC'
        )
            ->setParameter('fromUser', $fromUser)
            ->setParameter('toUser',  $toUser)
            ->setMaxResults(10)
        ;

        // returns an array of Product objects
        return $query->getResult();
    }
}