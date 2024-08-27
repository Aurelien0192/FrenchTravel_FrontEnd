export const PrivacyPolicy:React.FC = () => {
  window.scroll(0,0)
  return (
    <div className="flex flex-col gap-3">
      <h1 className="text-3xl font-bold">Charte de Confidentialité de French Travel</h1>
      <p className="font-bold">Dernière mise à jour : 27/08/2024</p>
      
      <p>Bienvenue sur French Travel. La protection de votre vie privée est une priorité pour nous. Cette charte de confidentialité décrit comment nous collectons, utilisons, et protégeons les données personnelles que vous nous fournissez sur notre site.</p>
      
      <h2 className="text-2xl">1. Données Collectées</h2>
      
      <h3 className="text-xl italic pl-9">1.1. Utilisateurs</h3>
      <p>Lorsque vous vous inscrivez sur French Travel, nous collectons uniquement les données suivantes :</p>
      <ul className="list-disc pl-10">
        <li className="font-bold">Adresse e-mail (obligatoire)</li>
        <li>Nom et Prénom (facultatif)</li>
      </ul>
      <p>Ces informations ne sont utilisées que dans un objectif d'authentification est ne sont utilisées que pour cette finalité.</p>
      
      <h3 className="text-xl italic pl-9">1.2. Professionnels</h3>
      <p>Les professionnels utilisant notre site pour proposer des lieux ou des services doivent fournir des informations supplémentaires à des fins de contrôle :</p>
      <ul className="list-disc pl-10">
        <li className="font-bold">Nom et prénom du représentant</li>
        <li className="font-bold">Adresse e-mail professionnelle</li>
      </ul>
      <p>Lors de l'enregistrement de votre établissement sur la plateforme, il vous sera demandé de fournir obligatoirement : </p>
      <ul className="list-disc pl-10">
        <li className="font-bold">Nom de l'entreprise</li>
        <li className="font-bold">Adresse physique de l'entreprise</li>
        <li className="font-bold">Description de votre établissement</li>
      </ul>
      <p>Ces données sont nécessaires pour vérifier l'authenticité des professionnels et assurer un service de qualité aux utilisateurs.</p>
      <h2 className="text-2xl">2. Utilisation des Données</h2>
      
      <h3 className="text-xl italic pl-9">2.1. Utilisateurs</h3>
      <p>Les données collectées auprès des utilisateurs sont utilisées pour :</p>
      <ul>
        <li>Gérer votre compte et vos préférences sur le site.</li>
        <li>Vous envoyer des communications liées à votre utilisation de French Travel, telles que des notifications ou des newsletters, si vous avez donné votre consentement.</li>
      </ul>
      
      <h3 className="text-xl italic pl-9">2.2. Professionnels</h3>
      <p>Les informations fournies par les professionnels sont utilisées pour :</p>
      <ul>
        <li>Vérifier l'identité et la légitimité des entreprises proposant des lieux ou des services sur notre site.</li>
        <li>Faciliter les communications entre French Travel et les professionnels.</li>
      </ul>
      
      <h2 className="text-2xl">3. Partage des Données</h2>
      <p>Vos données personnelles ne sont jamais partagées avec des tiers. Elles sont exclusivement utilisées par French Travel pour les finalités mentionnées ci-dessus.</p>
      
      <h2 className="text-2xl">4. Sécurité des Données</h2>
      <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données contre tout accès non autorisé, altération, divulgation ou destruction. Toutes les données sont stockées de manière sécurisée et ne sont accessibles que par l'administrateur au sein de French Travel.</p>
      
      <h2 className="text-2xl">5. Conservation et Suppression des Données</h2>
      <p>Vos données sont conservées aussi longtemps que nécessaire pour vous fournir les services de French Travel ou pour répondre à des obligations légales. Toutefois, vous avez le droit de supprimer à tout moment votre compte, ammenant à la suppression immédiate de toutes les données liées à votre compte utilisateur.</p>
      
      <h2 className="text-2xl">6. Droits des Utilisateurs</h2>
      <p>Conformément à la législation en vigueur, vous disposez des droits suivants concernant vos données personnelles :</p>
      <ul>
        <li>Droit d'accès : Vous pouvez demander à consulter les données personnelles que nous détenons à votre sujet.</li>
        <li>Droit de rectification : Vous pouvez demander la correction des données incorrectes ou incomplètes.</li>
        <li>Droit de suppression : Vous pouvez demander la suppression de vos données personnelles.</li>
        <li>Droit d'opposition : Vous pouvez vous opposer à l'utilisation de vos données pour certaines finalités.</li>
      </ul>
      <p>Pour exercer vos droits, veuillez nous contacter à l'adresse suivante : frenchtravel@gmail.com.</p>
      
      <h2 className="text-2xl">7. Modifications de la Charte de Confidentialité</h2>
      <p>French Travel se réserve le droit de modifier cette charte de confidentialité à tout moment. Toute modification sera publiée sur cette page, et nous vous informerons par e-mail si les changements sont significatifs. Nous vous encourageons à consulter régulièrement cette page pour rester informé des mises à jour.</p>
      
      <h2 className="text-2xl">8. Contact</h2>
      <p>Si vous avez des questions ou des préoccupations concernant cette charte de confidentialité, n'hésitez pas à nous contacter à frenchtravel@gmail.com.</p>

      <p>Merci de votre confiance et bonne visite sur French Travel.</p>
    </div>
  );
};
